import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParDenCarDto, ParDenCarService } from '../../../service/DenCar/den-car';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-den-car-edit',
  standalone: false,
  templateUrl: './den-car-edit.html',
  styleUrl: './den-car-edit.css'
})
export class DenCarEdit {


  @Input() dencarSeleccionado: ParDenCarDto | null = null;
  @Output() cargarDencars = new EventEmitter<void>();

  nuevoNombre: string = '';

  constructor(private parDenCarService: ParDenCarService) {}

  limpiarCampos(): void {
    this.nuevoNombre = '';
  }

  convertirMayusculas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const valor = input.value.toUpperCase();
    input.value = valor;
    this.nuevoNombre = valor;

  }

  cerrarModal(): void {
    (document.querySelector('#modalEditar .btn-close') as HTMLElement)?.click();
  }

  guardarCambios(): void {
    if (!this.dencarSeleccionado) {
      Swal.fire('Error', 'No hay denominación de cargo seleccionada', 'error');
      return;
    }

    const nombreTrimmed = this.nuevoNombre.trim();

    if (!nombreTrimmed) {
      Swal.fire('Error', 'El nombre no puede estar vacío', 'error');
      return;
    }

    if (nombreTrimmed === this.dencarSeleccionado.dsDencar) {
      Swal.fire('Información', 'El nombre es igual al anterior. No hay cambios que guardar.', 'info');
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      text: `Cambiará el nombre de "${this.dencarSeleccionado.dsDencar}" a "${nombreTrimmed}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const dencarActualizado: ParDenCarDto = {
          idDencar: this.dencarSeleccionado!.idDencar,
          dsDencar: nombreTrimmed,
          estDencar: this.dencarSeleccionado!.estDencar
        };

        this.parDenCarService.editarDenCar(dencarActualizado).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Actualizado!',
              text: 'La denominación de cargo ha sido actualizada correctamente.',
              icon: 'success',
              confirmButtonColor: '#0d6efd',
              timer: 2000,
              showConfirmButton: false
            });

            this.dencarSeleccionado!.dsDencar = nombreTrimmed;
            this.cargarDencars.emit();
            this.nuevoNombre = '';
            this.cerrarModal();
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al actualizar la denominación de cargo.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
