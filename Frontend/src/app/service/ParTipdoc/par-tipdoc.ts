import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParTipdocDto {
  id_tipdoc: number;
  ds_tipdoc: string;
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
}
