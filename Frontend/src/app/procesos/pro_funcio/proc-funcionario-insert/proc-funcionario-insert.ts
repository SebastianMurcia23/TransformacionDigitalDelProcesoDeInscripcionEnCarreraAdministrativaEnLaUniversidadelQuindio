import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaisDto, ParPaisesService } from '../../../service/ParPaises/par-paises';
import { ParGeneroService, ParGeneroDto } from '../../../service/ParGenero/par-genero';
import { ParTipDocService, ParTipdocDto } from '../../../service/ParTipdoc/par-tipdoc';
import { ProFuncioDto, ProFuncioService } from '../../../service/ProFuncio/pro-funcio';
import { ParDesCarService, ParDesCarDto } from '../../../service/DesCar/des-car';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proc-funcionario-insert',
  standalone: false,
  templateUrl: './proc-funcionario-insert.html',
  styleUrl: './proc-funcionario-insert.css'
})
export class ProcFuncionarioInsert implements OnInit {

  @Output() cargarFuncionarios = new EventEmitter<void>();

  paises: PaisDto[] = [];
  generos: ParGeneroDto[] = [];
  tipDocs: ParTipdocDto[] = [];
  descars: ParDesCarDto[] = [];

  nuevoFuncionario: ProFuncioDto = {
    id_funcio: 0,
    id_tipdoc: 0,
    id_genero: 0,
    nm_func1: '',
    nm_func2: '',
    ap_func1: '',
    ap_func2: '',
    id_pais: 0,
    id_depart: 0,
    id_munici: 0,
    no_funcio: 0,
    ce_funcio: '',
    fechaExpedicion: null,
    id_descar: null
  };

  constructor(
    private parPaises: ParPaisesService,
    private parGeneros: ParGeneroService,
    private parTipdoc: ParTipDocService,
    private proFuncioService: ProFuncioService,
    private parDesCarService: ParDesCarService
  ) { }

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarGeneros();
    this.cargarParTipDocs();
    this.cargarDescars();
  }

  cargarDescars(): void {
    this.parDesCarService.listarDesCars().subscribe({
      next: (data) => this.descars = data,
      error: (err) => console.error('Error cargando descars', err)
    });
  }

  convertirMayusculasCampo(campo: keyof ProFuncioDto): void {
    const valor = this.nuevoFuncionario[campo];
    if (valor && typeof valor === 'string') {
      (this.nuevoFuncionario as any)[campo] = valor.toUpperCase();
    }
  }

  cerrarModal(): void {
    (document.querySelector('#modalAgregar .btn-close') as HTMLElement)?.click();
  }

  guardarFuncionario(): void {
    this.nuevoFuncionario.no_funcio = Number(this.nuevoFuncionario.no_funcio);

    if (!this.nuevoFuncionario.nm_func1 || !this.nuevoFuncionario.ap_func1) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Debe ingresar al menos el primer nombre y primer apellido.',
        confirmButtonColor: '#3085d6',
        timer: 2500,
        showConfirmButton: false
      });
      return;
    }

    Swal.fire({
      title: '¿Desea guardar este funcionario?',
      text: 'Verifique que toda la información sea correcta antes de continuar.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.proFuncioService.crearFuncionario(this.nuevoFuncionario).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Guardado!',
            text: 'El funcionario ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            timer: 2000,
            showConfirmButton: false
          });
          this.cargarFuncionarios.emit();
          this.limpiarFormulario();
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al guardar funcionario', err);
          Swal.fire('Error', 'Ocurrió un problema al guardar el funcionario.', 'error');
        }
      });
    });
  }

  cargarParTipDocs(): void {
    this.parTipdoc.listarTipDocs().subscribe({
      next: (data) => this.tipDocs = data,
      error: (err) => console.error('Error cargando tipos de documento', err)
    });
  }

  cargarGeneros(): void {
    this.parGeneros.listarGeneros().subscribe({
      next: (data) => this.generos = data,
      error: (err) => console.error('Error cargando generos', err)
    });
  }

  cargarPaises(): void {
    this.parPaises.listarPaises().subscribe({
      next: (data) => this.paises = data,
      error: (err) => console.error('Error cargando paises', err)
    });
  }

  limpiarFormulario(): void {
    this.nuevoFuncionario = {
      id_genero: 0,
      id_tipdoc: 0,
      id_funcio: 0,
      fechaExpedicion: null,
      nm_func1: '',
      nm_func2: '',
      ap_func1: '',
      ap_func2: '',
      id_pais: 0,
      id_depart: 0,
      id_munici: 0,
      no_funcio: 0,
      ce_funcio: '',
      id_descar: null
    };
  }
}