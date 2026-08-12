import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CrearAnotacionDto {
  idFuncio:           number;
  idTipsol:           string;
  fechaAnotacion:     string;
  actoAdministrativo: string;
  idDescar:           number | null;
  idCarsoles:         number[];
  fechaIniComision?:  string | null;
  fechaFinComision?:  string | null;

  // ── NUEVO: Datos del Proceso de Selección (solo "Por Incorporación") ──
  numeroConvocatoriaActoAdministrativo?: string | null;
  fechaConvocatoriaActoAdministrativo?:  string | null;
  numeroResolucionListaElegibles?:       string | null;
  fechaResolucion?:                      string | null;
  actoAdministrativoNombramiento?:       string | null;
  fechaActoAdministrativo?:              string | null;
  numeroActaPosesion?:                   string | null;
  fechaActaPosesion?:                    string | null;
  fechaSuperoPeriodoPrueba?:             string | null;
}

export interface ListarAnotacionDto {
  idAnotacion:        number;
  idTipsol:           string;
  dsTipsol:           string;
  actoAdministrativo: string;
  fechaAnotacion:     string;
  fechaIniComision:   string | null;
  fechaFinComision:   string | null;
  idDescar:           number | null;
  dsDescar:           string | null;
  cdDescar:           number | null;
  grDescar:           number | null;
  dsCarsoles:         string[];

  // ── NUEVO ──
  numeroConvocatoriaActoAdministrativo: string | null;
  fechaConvocatoriaActoAdministrativo:  string | null;
  numeroResolucionListaElegibles:       string | null;
  fechaResolucion:                      string | null;
  actoAdministrativoNombramiento:       string | null;
  fechaActoAdministrativo:              string | null;
  numeroActaPosesion:                   string | null;
  fechaActaPosesion:                    string | null;
  fechaSuperoPeriodoPrueba:             string | null;
}

@Injectable({ providedIn: 'root' })
export class ProAnotacionService {

  private apiUrl = 'http://localhost:8080/api/anotacion';

  constructor(private http: HttpClient) {}

  crear(dto: CrearAnotacionDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarPorFuncionario(idFuncio: number): Observable<ListarAnotacionDto[]> {
    return this.http.get<ListarAnotacionDto[]>(`${this.apiUrl}/funcio/${idFuncio}`);
  }
}