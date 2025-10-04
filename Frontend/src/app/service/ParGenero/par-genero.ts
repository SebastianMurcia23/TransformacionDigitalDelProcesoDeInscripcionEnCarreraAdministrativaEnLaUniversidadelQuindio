import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParGeneroDto {

  id_genero: number;
  ds_genero: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParGeneroService {

  private apiUrl = 'http://localhost:8080/api/genero';

  constructor(private http: HttpClient) {}
    listarGeneros(): Observable<ParGeneroDto[]> {
    return this.http.get<ParGeneroDto[]>(this.apiUrl);
  }
}
