import * as XLSX from 'xlsx';
import { ListarAnotacionDto } from '../../../service/proAnotacion/pro-anotacion.service';
import { ProFuncioDto } from '../../../service/ProFuncio/pro-funcio';

/**
 * Utilidades de exportación (Excel/CSV) para el módulo de Anotaciones.
 * Archivo NUEVO, aditivo. No modifica ninguna lógica existente.
 */

// ── Helpers internos ─────────────────────────────────────────────────────

function nombreCompletoFuncionario(f: ProFuncioDto): string {
  return `${f.nm_func1 ?? ''} ${f.nm_func2 ?? ''} ${f.ap_func1 ?? ''} ${f.ap_func2 ?? ''}`
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Construye la fila (objeto) para una anotación, respetando exactamente
 * los campos que ya expone ListarAnotacionDto.
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

  return fila;
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
  const headers = Object.keys(filas[0]);
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
    const headers = Object.keys(filas[0] ?? {});
    aoa.push(headers);
    for (const fila of filas) {
      aoa.push(headers.map(h => fila[h]));
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