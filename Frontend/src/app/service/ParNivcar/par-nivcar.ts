import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ParNivcarDto {
  idNivcar: number;
  dsNivcar: string;
  estNivcar: boolean;
}

@Injectable({
  providedIn: 'root'
})



export class ParNivcarService {

  private apiUrl = 'http://localhost:8080/api/nivcar';

  constructor(private http: HttpClient) { }

  listarNivcar(): Observable<ParNivcarDto[]> {
    return this.http.get<ParNivcarDto[]>(this.apiUrl);
  }

  crearNivcar(ParNivcarDto: ParNivcarDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, ParNivcarDto);
  }

  editarNivcar(ParNivcarDto: ParNivcarDto): Observable<void> {
    return this.http.put<void>(this.apiUrl, ParNivcarDto);
  }

  cambiarEstadoNivcar(ParNivcarDto: ParNivcarDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/est`, ParNivcarDto);
  }

  eliminarNivcar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
