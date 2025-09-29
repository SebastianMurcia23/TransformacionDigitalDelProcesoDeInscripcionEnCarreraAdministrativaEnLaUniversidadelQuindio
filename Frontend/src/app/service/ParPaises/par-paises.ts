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
export class ParPaises {

  private apiUrl = 'http://localhost:8080/api/paises';

  constructor(private http: HttpClient) {}

  listarPaises(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
