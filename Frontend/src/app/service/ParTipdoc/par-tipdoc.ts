import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParTipdocDto {
  id_tipdoc: number;
  ds_tipdoc: string;
  est_tipdoc: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ParTipDocService {


  private apiUrl = 'http://localhost:8080/api/tipdoc';

  constructor(private http: HttpClient) {}  

  listarTipDocs(): Observable<ParTipdocDto[]> {
    return this.http.get<ParTipdocDto[]>(this.apiUrl);
  }

  crearTipDoc(ParTipdocDto: ParTipdocDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, ParTipdocDto);
  }

  editarTipDoc(ParTipdocDto: ParTipdocDto): Observable<void> {
    return this.http.put<void>(this.apiUrl, ParTipdocDto);
  }
  cambiarEstadoTipDoc(ParTipdocDto: ParTipdocDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/est`, ParTipdocDto);
  }

  eliminarTipDoc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
