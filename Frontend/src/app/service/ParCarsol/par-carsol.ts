import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CrearCarsolDto {
  dsCarsol:  string;
  estCarsol: boolean;
  idTipsol:  string;
}

export interface EditarCarsolDto {
  idCarsol:  number;
  dsCarsol:  string;
  sgCarsol:  string;
  estCarsol: boolean;
  idTipsol:  string;
}

export interface InformacionCarsolDto {
  idCarsol:     number;
  dsCarsol:     string;
  sgCarsol:     string;
  estCarsol:    boolean;
  idTipsol:     string;
  nombreTipsol: string;
}

export interface ListarCarsolDto {
  idCarsol:     number;
  dsCarsol:     string;
  sgCarsol:     string;
  estCarsol:    boolean;
  nombreTipsol: string;
}

@Injectable({ providedIn: 'root' })
export class ParCarsolService {

  private apiUrl = 'http://localhost:8080/api/carsol';

  constructor(private http: HttpClient) {}

  listarCarsols(): Observable<ListarCarsolDto[]> {
    return this.http.get<ListarCarsolDto[]>(this.apiUrl);
  }

  obtenerCarsol(id: number): Observable<InformacionCarsolDto> {
    return this.http.get<InformacionCarsolDto>(`${this.apiUrl}/${id}`);
  }

  crearCarsol(dto: CrearCarsolDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  editarCarsol(dto: EditarCarsolDto): Observable<void> {
    return this.http.put<void>(this.apiUrl, dto);
  }

  eliminarCarsol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}