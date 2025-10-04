import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';    
import { HttpClient } from '@angular/common/http';   

export interface PaisDto {
  idPais: number;
  nombre: string;
}


@Injectable({
  providedIn: 'root'
})
export class ParPaisesService {

  private apiUrl = 'http://localhost:8080/api/paises';

  constructor(private http: HttpClient) {}

  listarPaises(): Observable<PaisDto[]> {
    return this.http.get<PaisDto[]>(this.apiUrl);
  }
  
}
