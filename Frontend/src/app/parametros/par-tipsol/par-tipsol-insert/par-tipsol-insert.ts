import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ParTipsolDto, ParTipsolService } from '../../../service/ParTipsol/par-tipsol';

@Component({
  selector: 'app-par-tipsol-insert',
  standalone: false,
  templateUrl: './par-tipsol-insert.html',
  styleUrl: './par-tipsol-insert.css'
})
export class ParTipsolInsert {

  @Output() cargarTipsols = new EventEmitter<void>();

  nuevoTipsol: ParTipsolDto = {
    idTipsol:  '',
    dsTipsol:  '',
    sgTipsol:  '',
    estTipsol: true
  };

  constructor(private parTipsolService: ParTipsolService) {}

  convertirMayusculas(event: Event, campo: 'id' | 'ds' | 'sg'): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const valor = input.value.toUpperCase();
    input.value = valor;
    if (campo === 'id')      this.nuevoTipsol.idTipsol = valor;
    else if (campo === 'ds') this.nuevoTipsol.dsTipsol = valor;
    else                     this.nuevoTipsol.sgTipsol  = valor;
  }

  limpiarCampos(): void {
    this.nuevoTipsol = {
      idTipsol:  '',
      dsTipsol:  '',
      sgTipsol:  '',
      estTipsol: true
    };
  }

  cerrarModal(): void {
    (document.querySelector('#modalAgregarTipsol .btn-close') as HTMLElement)?.click();
  }

  guardarTipsol(): void {
    this.nuevoTipsol.idTipsol = this.nuevoTipsol.idTipsol.trim();
    this.nuevoTipsol.dsTipsol = this.nuevoTipsol.dsTipsol.trim();
    this.nuevoTipsol.sgTipsol = this.nuevoTipsol.sgTipsol.trim();

    Swal.fire({
      title: '¿Desea guardar este tipo de solicitud?',
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

      this.parTipsolService.crearTipsol(this.nuevoTipsol).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Guardado!',
            text: 'El tipo de solicitud ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            timer: 2000,
            showConfirmButton: false
          });
          this.cargarTipsols.emit();
          this.limpiarCampos();
          this.cerrarModal();
        },
        error: (err) => {
          console.error(err);
          const mensaje = err.error && typeof err.error === 'string'
            ? err.error
            : 'Ocurrió un error al guardar el tipo de solicitud.';
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
}