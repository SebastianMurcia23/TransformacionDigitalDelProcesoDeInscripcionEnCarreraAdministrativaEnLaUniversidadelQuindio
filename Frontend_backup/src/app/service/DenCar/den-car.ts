import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ParDenCarDto {
  idDencar: number;
  dsDencar: string;
  estDencar: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ParDenCarService {


  private apiUrl = 'http://localhost:8080/api/dencar';

  constructor(private http: HttpClient) { }

  listarDenCars(): Observable<ParDenCarDto[]> {
    return this.http.get<ParDenCarDto[]>(this.apiUrl);
  }

  crearDenCar(denCarDto: ParDenCarDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, denCarDto);
  }

  editarDenCar(denCarDto: ParDenCarDto): Observable<void> {
    return this.http.put<void>(this.apiUrl, denCarDto);
  }

  cambiarEstadoDenCar(denCarDto: ParDenCarDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/est`, denCarDto);
  }

  eliminarDenCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



}
