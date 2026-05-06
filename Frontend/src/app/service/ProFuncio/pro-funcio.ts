import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProFuncioDto {
  id_funcio:       number;
  id_tipdoc:       number;
  id_genero:       number;
  nm_func1:        string;
  nm_func2:        string;
  ap_func1:        string;
  ap_func2:        string;
  id_pais:         number;
  id_depart:       number;
  id_munici:       number;
  no_funcio:       number;
  ce_funcio:       string;
  fechaExpedicion: any;
  id_descar?:      number | null;  // ✅ NUEVO
  ds_descar?:      string | null;  // ✅ NUEVO
}

@Injectable({ providedIn: 'root' })
export class ProFuncioService {

  private apiUrl = 'http://localhost:8080/api/profuncio';

  constructor(private http: HttpClient) {}

  listarFuncionarios(): Observable<ProFuncioDto[]> {
    return this.http.get<ProFuncioDto[]>(this.apiUrl);
  }

  obtenerFuncionario(id: number): Observable<ProFuncioDto> {
    return this.http.get<ProFuncioDto>(`${this.apiUrl}/${id}`);
  }

  crearFuncionario(dto: ProFuncioDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, dto);
  }

  editarFuncionario(dto: ProFuncioDto): Observable<void> {
    return this.http.put<void>(this.apiUrl, dto);
  }

  eliminarFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}