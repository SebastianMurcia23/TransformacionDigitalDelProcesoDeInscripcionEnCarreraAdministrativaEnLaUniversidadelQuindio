import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { EditarCarsolDto, InformacionCarsolDto, ParCarsolService } from '../../../service/ParCarsol/par-carsol';
import { ListarTipsolDto, ParTipsolService } from '../../../service/ParTipsol/par-tipsol';

@Component({
  selector: 'app-par-carsol-edit',
  standalone: false,
  templateUrl: './par-carsol-edit.html',
  styleUrl: './par-carsol-edit.css'
})
export class ParCarsolEdit implements OnInit, OnChanges {

  @Input()  carsolSeleccionado: InformacionCarsolDto | null = null;
  @Output() cargarCarsols = new EventEmitter<void>();

  tipsols: ListarTipsolDto[] = [];

  carsolEditar: EditarCarsolDto = {
    idCarsol:  0,
    dsCarsol:  '',
    sgCarsol:  '',
    estCarsol: true,
    idTipsol:  ''
  };

  constructor(
    private parCarsolService: ParCarsolService,
    private parTipsolService: ParTipsolService
  ) {}

  ngOnInit(): void {
    this.parTipsolService.listarTipsols().subscribe({
      next: (data) => this.tipsols = data,
      error: (err)  => console.error('Error cargando tipos de solicitud', err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['carsolSeleccionado'] && this.carsolSeleccionado) {
      this.carsolEditar = {
        idCarsol:  this.carsolSeleccionado.idCarsol,
        dsCarsol:  this.carsolSeleccionado.dsCarsol,
        sgCarsol:  this.carsolSeleccionado.sgCarsol,
        estCarsol: this.carsolSeleccionado.estCarsol,
        idTipsol:  this.carsolSeleccionado.idTipsol
      };
    }
  }

  convertirMayusculas(event: Event, campo: 'ds' | 'sg'): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const valor = input.value.toUpperCase();
    input.value = valor;
    if (campo === 'ds') this.carsolEditar.dsCarsol = valor;
    else                this.carsolEditar.sgCarsol  = valor;
  }

  editarCarsol(): void {
    this.carsolEditar.dsCarsol = this.carsolEditar.dsCarsol.trim();
    this.carsolEditar.sgCarsol = this.carsolEditar.sgCarsol.trim();

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      text: 'Verifique que toda la información sea correcta antes de continuar.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.parCarsolService.editarCarsol(this.carsolEditar).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'La característica de solicitud ha sido actualizada correctamente.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            timer: 2000,
            showConfirmButton: false
          });
          this.cargarCarsols.emit();
          this.cerrarModal();
        },
        error: (err) => {
          console.error(err);
          const mensaje = err.error && typeof err.error === 'string'
            ? err.error
            : 'Ocurrió un error al actualizar la característica de solicitud.';
          Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      });
    });
  }

  cerrarModal(): void {
    (document.querySelector('#modalEditarCarsol .btn-close') as HTMLElement)?.click();
  }
}