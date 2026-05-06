import { Component, OnInit } from '@angular/core';
import { ProFuncioDto, ProFuncioService } from '../../../service/ProFuncio/pro-funcio';
import { ParDesCarDto, ParDesCarService } from '../../../service/DesCar/des-car';

@Component({
  selector: 'app-proc-anotaciones',
  standalone: false,
  templateUrl: './proc-anotaciones.html',
  styleUrl: './proc-anotaciones.css'
})
export class ProcAnotaciones implements OnInit {

  searchId:             string        = '';
  funcionarios:         ProFuncioDto[] = [];
  todosLosFuncionarios: ProFuncioDto[] = [];
  descars:              ParDesCarDto[] = [];

  funcionarioSeleccionado: ProFuncioDto | null = null;
  descarSeleccionado:      ParDesCarDto | null = null;

  constructor(
    private proFuncioService: ProFuncioService,
    private parDesCarService: ParDesCarService
  ) {}

  ngOnInit(): void {
    this.cargarFuncionarios();
    this.cargarDescars();
  }

  cargarFuncionarios(): void {
    this.proFuncioService.listarFuncionarios().subscribe({
      next:  (data) => { this.todosLosFuncionarios = data; this.funcionarios = []; },
      error: (err)  => console.error('Error cargando funcionarios', err)
    });
  }

  cargarDescars(): void {
    this.parDesCarService.listarDesCars().subscribe({
      next:  (data) => this.descars = data,
      error: (err)  => console.error('Error cargando descars', err)
    });
  }

  buscarFuncionario(): void {
    const search = this.searchId.trim();
    this.funcionarioSeleccionado = null;
    this.descarSeleccionado = null;

    if (!search) {
      this.funcionarios = [];
      return;
    }

    this.funcionarios = this.todosLosFuncionarios.filter(f =>
      f.id_funcio.toString().startsWith(search)
    );
  }

  seleccionarFuncionario(funcionario: ProFuncioDto): void {
    this.funcionarioSeleccionado = funcionario;
    this.funcionarios = [];
    this.searchId = funcionario.id_funcio.toString();

    // Buscar el descar asociado en la lista ya cargada
    if (funcionario.id_descar) {
      this.descarSeleccionado = this.descars.find(
        d => d.idDescar === funcionario.id_descar
      ) ?? null;
    } else {
      this.descarSeleccionado = null;
    }
  }

  limpiarSeleccion(): void {
    this.funcionarioSeleccionado = null;
    this.descarSeleccionado = null;
    this.funcionarios = [];
    this.searchId = '';
  }
}