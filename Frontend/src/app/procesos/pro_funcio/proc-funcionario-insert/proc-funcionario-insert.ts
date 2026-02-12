import { Component, EventEmitter, Output } from '@angular/core';
import { PaisDto, ParPaisesService } from '../../../service/ParPaises/par-paises';
import { ParGeneroService, ParGeneroDto } from '../../../service/ParGenero/par-genero';
import { ParTipDocService, ParTipdocDto } from '../../../service/ParTipdoc/par-tipdoc';
import { ProFuncioDto, ProFuncioService } from '../../../service/ProFuncio/pro-funcio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proc-funcionario-insert',
  standalone: false,
  templateUrl: './proc-funcionario-insert.html',
  styleUrl: './proc-funcionario-insert.css'
})
export class ProcFuncionarioInsert {

  @Output() cargarFuncionarios = new EventEmitter<void>();

  paises: PaisDto[] = [];
  generos: ParGeneroDto[] = [];
  tipDocs: ParTipdocDto[] = [];

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
    fechaExpedicion: null
  };
  
  constructor(
    private parPaises: ParPaisesService,
    private parGeneros: ParGeneroService,
    private parTipdoc: ParTipDocService,
    private proFuncioService: ProFuncioService
  ) {}

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarGeneros();
    this.cargarParTipDocs();
  }

  convertirMayusculas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const valor = input.value.toUpperCase();
    input.value = valor;
  }

  cerrarModal(): void {
  (document.querySelector('#modalAgregar .btn-close') as HTMLElement)?.click();
  }

  guardarFuncionario(): void {
    this.nuevoFuncionario.no_funcio = Number(this.nuevoFuncionario.no_funcio);
    console.log('Valores actuales del funcionario:', this.nuevoFuncionario);

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
      if (result.isConfirmed) {
        this.proFuncioService.crearFuncionario(this.nuevoFuncionario).subscribe({
          next: (data) => {
            console.log('Funcionario guardado con éxito', data);

            Swal.fire({
              title: '¡Guardado!',
              text: 'El funcionario ha sido agregado correctamente.',
              icon: 'success',
              confirmButtonColor: '#28a745',
              timer: 2000,
              showConfirmButton: false
            });

            // Emitir evento para actualizar la lista del padre
            this.cargarFuncionarios.emit();

            // Limpiar el formulario
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
              ce_funcio: ''
            };

            this.cerrarModal();
          },
          error: (err) => {
            console.error('Error al guardar funcionario', err);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un problema al guardar el funcionario.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
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
    ce_funcio: ''
    };
  }
}
