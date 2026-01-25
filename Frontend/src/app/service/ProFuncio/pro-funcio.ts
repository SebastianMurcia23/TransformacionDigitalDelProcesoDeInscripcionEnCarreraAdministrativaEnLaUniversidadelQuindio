import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProFuncioDto {
  id_funcio: number;
  id_tipdoc: number;
  id_genero: number;
  nm_func1: string;
  nm_func2: string;
  ap_func1: string;
  ap_func2: string;
  id_pais: number;
  id_depart: number;
  id_munici: number;
  no_funcio: number;
  ce_funcio: string;
  fechaExpedicion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProFuncioService {

  private apiUrl = 'http://localhost:8080/api/profuncio';

  constructor(private http: HttpClient) {}

  listarFuncionarios(): Observable<ProFuncioDto[]> {
    return this.http.get<ProFuncioDto[]>(this.apiUrl);
  }

  obtenerFuncionario(id: number): Observable<ProFuncioDto> {
    return this.http.get<ProFuncioDto>(`${this.apiUrl}/${id}`);
  }

  crearFuncionario(ProcFuncioDto: ProFuncioDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, ProcFuncioDto);
  }

  editarFuncionario(dto: any): Observable<void> {
    return this.http.put<void>(this.apiUrl, dto);
  }

  eliminarFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarGeneros(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/generos');
  }

  listarTiposDocumento(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/tipooc');
  }

  listarDepartamentos(idPais: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/departamentos/${idPais}`);
  }

  listarMunicipios(idDepto: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/municipios/${idDepto}`);
  }
}
