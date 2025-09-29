import { Component } from '@angular/core';
import { ParPaises } from '../service/ParPaises/par-paises';
import { PaisDto } from '../service/ParPaises/par-paises';


@Component({
  selector: 'app-proc-funcionario-insert',
  standalone: false,
  templateUrl: './proc-funcionario-insert.html',
  styleUrl: './proc-funcionario-insert.css'
})
export class ProcFuncionarioInsert {

    paises: PaisDto[] = [];

    constructor(private parPaises: ParPaises) {}
  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.parPaises.listarPaises().subscribe({
      next: (data) => this.paises = data,
      error: (err) => console.error('Error cargando funcionarios', err)
    });
  }
  

}
