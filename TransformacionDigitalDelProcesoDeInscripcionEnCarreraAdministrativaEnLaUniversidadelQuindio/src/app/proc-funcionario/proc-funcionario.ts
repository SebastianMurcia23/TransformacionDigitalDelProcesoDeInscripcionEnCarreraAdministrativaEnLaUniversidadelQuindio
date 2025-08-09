import { Component } from '@angular/core';

@Component({
  selector: 'app-proc-funcionario',
  standalone: false,
  templateUrl: './proc-funcionario.html',
  styleUrl: './proc-funcionario.css'
})
export class ProcFuncionario {
  searchId: string = '';

  funcionarios = [
    {
      id: '1094900900',
      nombre: 'ANDRES FELIPE DELGADO',
      estado: 'Activo'
    }
  ];

}
