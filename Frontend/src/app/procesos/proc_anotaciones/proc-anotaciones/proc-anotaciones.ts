import { Component } from '@angular/core';

@Component({
  selector: 'app-proc-anotaciones',
  standalone: false,
  templateUrl: './proc-anotaciones.html',
  styleUrl: './proc-anotaciones.css'
})
export class ProcAnotaciones {

    searchId: string = '';

  funcionarios = [
    {
      id: '1094900900',
      nombre: 'ANDRES FELIPE DELGADO',
      estado: 'Activo'
    }
  ];

}
