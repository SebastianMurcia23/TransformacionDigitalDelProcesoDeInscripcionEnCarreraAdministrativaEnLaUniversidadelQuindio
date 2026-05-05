import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ParTipsolDto {
  idTipsol: string;
  dsTipsol: string;
  sgTipsol: string;
  estTipsol: boolean;
}

export interface InformacionTipsolDto {
  idTipsol: string;
  dsTipsol: string;
  sgTipsol: string;
  estTipsol: boolean;
}

export interface ListarTipsolDto {
  idTipsol: string;
  dsTipsol: string;
}

@Injectable({ providedIn: 'root' })
export class ParTipsolService {

  private apiUrl = 'http://localhost:8080/api/tipsol';

  constructor(private http: HttpClient) { }

  listarTipsols(): Observable<InformacionTipsolDto[]> {
    return this.http.get<InformacionTipsolDto[]>(this.apiUrl);
  }

  obtenerTipsol(id: string): Observable<InformacionTipsolDto> {
    return this.http.get<InformacionTipsolDto>(`${this.apiUrl}/${id}`);
  }

  crearTipsol(dto: ParTipsolDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  editarTipsol(dto: ParTipsolDto): Observable<void> {
    return this.http.put<void>(this.apiUrl, dto);
  }

  eliminarTipsol(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}