import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ListarDepartDto {
  id_depart: number;
  nm_depart: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParDepartService {
  private apiUrl = 'http://localhost:8080/api/departamentos';

  constructor(private http: HttpClient) { }

  listarDepartamentos(): Observable<ListarDepartDto[]> {
    return this.http.get<ListarDepartDto[]>(this.apiUrl);
  }

  listarDepartamentosPorPais(idPais: number): Observable<ListarDepartDto[]> {
    const params = new HttpParams().set('idPais', idPais.toString()); 
    return this.http.get<ListarDepartDto[]>(this.apiUrl, { params });
  }
}