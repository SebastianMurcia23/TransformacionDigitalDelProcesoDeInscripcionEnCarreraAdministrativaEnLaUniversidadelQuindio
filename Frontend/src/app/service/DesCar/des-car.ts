import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ParDesCarDto {
  idDescar:     number;
  cdDescar:     number;
  grDescar:     number;
  dsDescar:     string;
  estDescar:    boolean;
  nombreNivcar: string;
  nombreDencar: string;
  id_nivcar:    number;
  id_dencar:    number;
}

export interface CrearDesCarDto {
  cdDescar:  number;
  grDescar:  number;
  dsDescar:  string;
  estDescar: boolean;
  id_nivcar: number;
  id_dencar: number;
}

export interface EditarDesCarDto {
  idDescar:  number;
  cdDescar:  number;
  grDescar:  number;
  dsDescar:  string;
  estDescar: boolean;
  id_nivcar: number;
  id_dencar: number;
}

@Injectable({ providedIn: 'root' })
export class ParDesCarService {

  private apiUrl = 'http://localhost:8080/api/descar';

  constructor(private http: HttpClient) {}

  listarDesCars(): Observable<ParDesCarDto[]> {
    return this.http.get<ParDesCarDto[]>(this.apiUrl);
  }

  crearDesCar(dto: CrearDesCarDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, dto);
  }

  editarDesCar(dto: EditarDesCarDto): Observable<void> {
    return this.http.put<void>(this.apiUrl, dto);
  }

  eliminarDesCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}