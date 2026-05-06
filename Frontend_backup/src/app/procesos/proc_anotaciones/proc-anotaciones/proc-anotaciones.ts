import { Component, OnInit } from '@angular/core';
import { ProFuncioDto, ProFuncioService } from '../../../service/ProFuncio/pro-funcio';

@Component({
  selector: 'app-proc-anotaciones',
  standalone: false,
  templateUrl: './proc-anotaciones.html',
  styleUrl: './proc-anotaciones.css'
})
export class ProcAnotaciones implements OnInit {

  searchId: string = '';
  funcionarios: ProFuncioDto[] = [];
  todosLosFuncionarios: ProFuncioDto[] = [];

  constructor(private proFuncioService: ProFuncioService) {}

  ngOnInit(): void {
    this.cargarFuncionarios();
  }

  cargarFuncionarios(): void {
    this.proFuncioService.listarFuncionarios().subscribe({
      next: (data) => {
        this.todosLosFuncionarios = data;
        this.funcionarios = [];
      },
      error: (err) => console.error('Error cargando funcionarios', err)
    });
  }

  buscarFuncionario(): void {
    const search = this.searchId.trim();

    if (!search) {
      this.funcionarios = [];
      return;
    }

    this.funcionarios = this.todosLosFuncionarios.filter(func =>
      func.id_funcio.toString().startsWith(search)
    );
  }
}