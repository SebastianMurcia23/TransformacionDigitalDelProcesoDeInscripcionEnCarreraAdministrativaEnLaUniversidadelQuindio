import { Component, OnInit } from '@angular/core';
import { ProFuncioService, ProFuncioDto } from '../service/ProFuncio/pro-funcio';

@Component({
  selector: 'app-proc-funcionario',
  standalone: false,
  templateUrl: './proc-funcionario.html',
  styleUrl: './proc-funcionario.css'
})
export class ProcFuncionario implements OnInit {
  
  searchId: string = '';
  funcionarios: ProFuncioDto[] = [];

  constructor(private proFuncioService: ProFuncioService) {}

  ngOnInit(): void {
    this.cargarFuncionarios();
  }

  cargarFuncionarios(): void {
    this.proFuncioService.listarFuncionarios().subscribe({
      next: (data) => this.funcionarios = data,
      error: (err) => console.error('Error cargando funcionarios', err)
    });
  }

  buscarFuncionario(): void {
    if (!this.searchId) {
      this.cargarFuncionarios();
      return;
    }

    const id = parseInt(this.searchId, 10);
    this.proFuncioService.obtenerFuncionario(id).subscribe({
      next: (data) => this.funcionarios = [data],
      error: (err) => {
        console.error('Funcionario no encontrado', err);
        this.funcionarios = [];
      }
    });
  }

  eliminarFuncionario(id: number): void {
    this.proFuncioService.eliminarFuncionario(id).subscribe({
      next: () => this.cargarFuncionarios(),
      error: (err) => console.error('Error eliminando funcionario', err)
    });
  }
}
