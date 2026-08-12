import * as XLSX from 'xlsx';
import { ListarAnotacionDto } from '../../../service/proAnotacion/pro-anotacion.service';
import { ProFuncioDto } from '../../../service/ProFuncio/pro-funcio';


// ── Helpers internos ─────────────────────────────────────────────────────

function nombreCompletoFuncionario(f: ProFuncioDto): string {
  return `${f.nm_func1 ?? ''} ${f.nm_func2 ?? ''} ${f.ap_func1 ?? ''} ${f.ap_func2 ?? ''}`
    .replace(/\s+/g, ' ')
    .trim();
}

// ── NUEVO: definición de columnas de "Datos del Proceso de Selección" ──
const CAMPOS_INCORPORACION: { header: string; key: keyof ListarAnotacionDto }[] = [
  { header: 'Número de Convocatoria o Acto Administrativo', key: 'numeroConvocatoriaActoAdministrativo' },
  { header: 'Fecha de la Convocatoria o Acto Administrativo', key: 'fechaConvocatoriaActoAdministrativo' },
  { header: 'Número de Resolución de la Lista de Elegibles', key: 'numeroResolucionListaElegibles' },
  { header: 'Fecha de la Resolución', key: 'fechaResolucion' },
  { header: 'Acto Administrativo de Nombramiento', key: 'actoAdministrativoNombramiento' },
  { header: 'Fecha del Acto Administrativo', key: 'fechaActoAdministrativo' },
  { header: 'Número del Acta de Posesión', key: 'numeroActaPosesion' },
  { header: 'Fecha del Acta de Posesión', key: 'fechaActaPosesion' },
  { header: 'Fecha en la que superó el Período de Prueba', key: 'fechaSuperoPeriodoPrueba' },
];

/** true si la anotación tiene al menos un dato del proceso de selección diligenciado. */
function tieneDatosProcesoSeleccion(a: ListarAnotacionDto): boolean {
  return CAMPOS_INCORPORACION.some(campo => {
    const valor = (a as any)[campo.key];
    return valor !== null && valor !== undefined && valor !== '';
  });
}

/**
 * Construye la fila (objeto) para una anotación, respetando exactamente
 * los campos que ya expone ListarAnotacionDto.
 *
 * NUEVO: si la anotación tiene datos del proceso de selección (Por
 * Incorporación), se agregan esas 9 columnas al final de la fila.
 * Si no los tiene, la fila queda exactamente igual que antes.
 */
function construirFilaAnotacion(
  a: ListarAnotacionDto,
  funcionario?: ProFuncioDto | null
): Record<string, string | number> {
  const fila: Record<string, string | number> = {
    'ID Anotación': a.idAnotacion,
    'ID Tipo Anotación': a.idTipsol,
    'Descripción Tipo Anotación': a.dsTipsol,
    'Acto Administrativo': a.actoAdministrativo,
    'Fecha Anotación': a.fechaAnotacion ?? '',
    'Fecha Inicio Comisión': a.fechaIniComision ?? '',
    'Fecha Fin Comisión': a.fechaFinComision ?? '',
    'Causa(s)': a.dsCarsoles && a.dsCarsoles.length ? a.dsCarsoles.join(' | ') : '',
    'Denominación Empleo': a.dsDescar ?? '',
    'Código Empleo': a.cdDescar ?? '',
    'Grado Empleo': a.grDescar ?? ''
  };

  if (funcionario) {
    fila['Identificación Funcionario'] = funcionario.id_funcio;
    fila['Nombres y Apellidos Funcionario'] = nombreCompletoFuncionario(funcionario);
  }

  // ── NUEVO: Datos del Proceso de Selección (solo si aplica a esta anotación) ──
  if (tieneDatosProcesoSeleccion(a)) {
    for (const campo of CAMPOS_INCORPORACION) {
      fila[campo.header] = ((a as any)[campo.key] ?? '') as string;
    }
  }

  return fila;
}

/**
 * NUEVO: calcula los encabezados como la UNIÓN de las claves de todas las
 * filas (en el orden en que van apareciendo), en lugar de tomar solo las
 * claves de la primera fila. Esto evita que se pierdan columnas cuando,
 * por ejemplo, la primera anotación de la lista no es de incorporación
 * pero una posterior sí lo es.
 */
function obtenerHeadersUnion(filas: Record<string, any>[]): string[] {
  const headers: string[] = [];
  const vistos = new Set<string>();
  for (const fila of filas) {
    for (const key of Object.keys(fila)) {
      if (!vistos.has(key)) {
        vistos.add(key);
        headers.push(key);
      }
    }
  }
  return headers;
}

function escaparCampoCSV(valor: any): string {
  const str = valor === null || valor === undefined ? '' : String(valor);
  // Escapa si contiene coma, comilla doble, salto de línea o retorno de carro
  if (/[",\n\r]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function filasACSV(filas: Record<string, any>[]): string {
  if (!filas.length) return '';
  const headers = obtenerHeadersUnion(filas);
  const lineas = [headers.map(escaparCampoCSV).join(',')];
  for (const fila of filas) {
    lineas.push(headers.map(h => escaparCampoCSV(fila[h])).join(','));
  }
  return lineas.join('\r\n');
}

function descargarBlob(blob: Blob, nombreArchivo: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nombreArchivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function descargarCSV(contenido: string, nombreArchivo: string): void {
  // BOM UTF-8 para que Excel reconozca tildes/ñ correctamente al abrir el CSV
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + contenido], { type: 'text/csv;charset=utf-8;' });
  descargarBlob(blob, nombreArchivo);
}

function descargarExcelDesdeFilas(
  filas: Record<string, any>[],
  nombreArchivo: string,
  infoFuncionario?: { identificacion: string | number; nombre: string }
): void {
  const wb = XLSX.utils.book_new();
  let ws: XLSX.WorkSheet;

  if (infoFuncionario) {
    const aoa: any[][] = [];
    aoa.push(['Identificación', infoFuncionario.identificacion]);
    aoa.push(['Nombre completo', infoFuncionario.nombre]);
    aoa.push([]);
    // NUEVO: unión de encabezados en vez de solo los de la primera fila
    const headers = obtenerHeadersUnion(filas);
    aoa.push(headers);
    for (const fila of filas) {
      aoa.push(headers.map(h => fila[h] ?? ''));
    }
    ws = XLSX.utils.aoa_to_sheet(aoa);
  } else {
    ws = XLSX.utils.json_to_sheet(filas);
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Anotaciones');
  XLSX.writeFile(wb, nombreArchivo);
}

// ── API pública del util ─────────────────────────────────────────────────

export function descargarAnotacionExcel(
  a: ListarAnotacionDto,
  funcionario?: ProFuncioDto | null
): void {
  const fila = construirFilaAnotacion(a, funcionario);
  descargarExcelDesdeFilas([fila], `anotacion_${a.idAnotacion}.xlsx`);
}

export function descargarAnotacionCSV(
  a: ListarAnotacionDto,
  funcionario?: ProFuncioDto | null
): void {
  const fila = construirFilaAnotacion(a, funcionario);
  const csv = filasACSV([fila]);
  descargarCSV(csv, `anotacion_${a.idAnotacion}.csv`);
}

export function descargarTodasAnotacionesExcel(
  lista: ListarAnotacionDto[],
  funcionario: ProFuncioDto
): void {
  if (!lista || lista.length === 0) return;
  const filas = lista.map(a => construirFilaAnotacion(a));
  descargarExcelDesdeFilas(
    filas,
    `anotaciones_funcionario_${funcionario.id_funcio}.xlsx`,
    {
      identificacion: funcionario.id_funcio,
      nombre: nombreCompletoFuncionario(funcionario)
    }
  );
}

export function descargarTodasAnotacionesCSV(
  lista: ListarAnotacionDto[],
  funcionario: ProFuncioDto
): void {
  if (!lista || lista.length === 0) return;
  const filas = lista.map(a => construirFilaAnotacion(a));
  const encabezadoInfo =
    `${escaparCampoCSV('Identificación')},${escaparCampoCSV(funcionario.id_funcio)}\r\n` +
    `${escaparCampoCSV('Nombre completo')},${escaparCampoCSV(nombreCompletoFuncionario(funcionario))}\r\n\r\n`;
  const csv = encabezadoInfo + filasACSV(filas);
  descargarCSV(csv, `anotaciones_funcionario_${funcionario.id_funcio}.csv`);
}