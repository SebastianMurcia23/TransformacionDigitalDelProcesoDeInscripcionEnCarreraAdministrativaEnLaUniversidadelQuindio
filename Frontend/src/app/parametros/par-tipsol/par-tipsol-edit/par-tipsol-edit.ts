import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { ParTipsolDto, ParTipsolService } from '../../../service/ParTipsol/par-tipsol';

@Component({
  selector: 'app-par-tipsol-edit',
  standalone: false,
  templateUrl: './par-tipsol-edit.html',
  styleUrl: './par-tipsol-edit.css'
})
export class ParTipsolEdit implements OnChanges {

  @Input() tipsolSeleccionado: ParTipsolDto | null = null;
  @Output() cargarTipsols = new EventEmitter<void>();

  nuevoDs:  string  = '';
  nuevaSg:  string  = '';
  nuevoEst: boolean = true;

  constructor(private parTipsolService: ParTipsolService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipsolSeleccionado'] && this.tipsolSeleccionado) {
      this.nuevoDs  = this.tipsolSeleccionado.dsTipsol;
      this.nuevaSg  = this.tipsolSeleccionado.sgTipsol;
      this.nuevoEst = this.tipsolSeleccionado.estTipsol;
    }
  }

  limpiarCampos(): void {
    this.nuevoDs  = this.tipsolSeleccionado?.dsTipsol ?? '';
    this.nuevaSg  = this.tipsolSeleccionado?.sgTipsol ?? '';
    this.nuevoEst = this.tipsolSeleccionado?.estTipsol ?? true;
  }

  convertirMayusculas(event: Event, campo: 'ds' | 'sg'): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const valor = input.value.toUpperCase();
    if (campo === 'sg') this.nuevaSg = valor;
    else this.nuevoDs = valor;
  }

  cerrarModal(): void {
    (document.querySelector('#modalEditarTipsol .btn-close') as HTMLElement)?.click();
  }

  guardarCambios(): void {
    if (!this.tipsolSeleccionado) {
      Swal.fire('Error', 'No hay tipo de solicitud seleccionado', 'error');
      return;
    }

    const dsTrimmed = this.nuevoDs.trim();
    const sgTrimmed = this.nuevaSg.trim();

    if (!dsTrimmed || !sgTrimmed) {
      Swal.fire('Advertencia', 'La descripción y la sigla son obligatorias.', 'warning');
      return;
    }

    if (
      dsTrimmed   === this.tipsolSeleccionado.dsTipsol &&
      sgTrimmed   === this.tipsolSeleccionado.sgTipsol &&
      this.nuevoEst === this.tipsolSeleccionado.estTipsol
    ) {
      Swal.fire('Información', 'No hay cambios que guardar.', 'info');
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (!result.isConfirmed) return;

      const dto: ParTipsolDto = {
        idTipsol:  this.tipsolSeleccionado!.idTipsol,
        dsTipsol:  dsTrimmed,
        sgTipsol:  sgTrimmed,
        estTipsol: this.nuevoEst
      };

      this.parTipsolService.editarTipsol(dto).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El tipo de solicitud ha sido actualizado correctamente.',
            icon: 'success',
            confirmButtonColor: '#0d6efd',
            timer: 2000,
            showConfirmButton: false
          });

          this.tipsolSeleccionado!.dsTipsol  = dsTrimmed;
          this.tipsolSeleccionado!.sgTipsol  = sgTrimmed;
          this.tipsolSeleccionado!.estTipsol = this.nuevoEst;
          this.cargarTipsols.emit();
          this.limpiarCampos();
          this.cerrarModal();
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Ocurrió un error al actualizar el tipo de solicitud.', 'error');
        }
      });
    });
  }
}