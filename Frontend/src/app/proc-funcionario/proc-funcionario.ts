import { Component, OnInit } from '@angular/core';
import { ProFuncioService, ProFuncioDto } from '../service/ProFuncio/pro-funcio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proc-funcionario',
  standalone: false,
  templateUrl: './proc-funcionario.html',
  styleUrl: './proc-funcionario.css'
})
export class ProcFuncionario implements OnInit {

  searchId: string = '';
  funcionarios: ProFuncioDto[] = [];
  todosLosFuncionarios: ProFuncioDto[] = []; 
  funcionarioSeleccionado: ProFuncioDto | null = null;

  constructor(private proFuncioService: ProFuncioService) {}


  ngOnInit(): void {
    this.cargarFuncionarios();
  }

  abrirModalMostrar(funcionario: ProFuncioDto): void {
    this.funcionarioSeleccionado = funcionario;
    console.log('Funcionario seleccionado:', funcionario);
  }

  seleccionarParaEditar(funcionario: ProFuncioDto) {
  this.funcionarioSeleccionado = funcionario;
  console.log('Funcionario seleccionado:', funcionario);
  }
  
  cargarFuncionarios(): void {
    this.proFuncioService.listarFuncionarios().subscribe({
      next: (data) => {
        this.funcionarios = data;
        this.todosLosFuncionarios = data;
      },
      error: (err) => console.error('Error cargando funcionarios', err)
    });
  }

  buscarFuncionario(): void {
    const search = this.searchId.trim();

    if (!search) {
      this.funcionarios = this.todosLosFuncionarios;
      return;
    }

    this.funcionarios = this.todosLosFuncionarios.filter(func =>
      func.id_funcio.toString().startsWith(search)
    );
  }

  eliminarFuncionario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el funcionario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.proFuncioService.eliminarFuncionario(id).subscribe({
          next: () => {
            this.cargarFuncionarios();

            Swal.fire({
              title: '¡Eliminado!',
              text: 'El funcionario ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Error eliminando funcionario', err);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un problema al eliminar el funcionario.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
