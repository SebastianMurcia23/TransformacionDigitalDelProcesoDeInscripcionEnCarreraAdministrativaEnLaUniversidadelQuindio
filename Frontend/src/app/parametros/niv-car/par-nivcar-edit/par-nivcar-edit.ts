import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParNivcarDto, ParNivcarService } from '../../../service/ParNivcar/par-nivcar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-par-nivcar-edit',
  standalone: false,
  templateUrl: './par-nivcar-edit.html',
  styleUrl: './par-nivcar-edit.css'
})
export class ParNivcarEdit {


  @Input() nivcarSeleccionado: ParNivcarDto | null = null;
  @Output() cargarNivcars = new EventEmitter<void>();

  nuevoNombre: string = '';

  constructor(private parNivcarService: ParNivcarService) { }

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
    if (!this.nivcarSeleccionado) {
      Swal.fire('Error', 'No hay nivel de cargo seleccionado', 'error');
      return;
    }

    const nombreTrimmed = this.nuevoNombre.trim();

    if (!nombreTrimmed) {
      Swal.fire('Error', 'El nombre no puede estar vacío', 'error');
      return;
    }

    if (nombreTrimmed === this.nivcarSeleccionado.dsNivcar) {
      Swal.fire('Información', 'El nombre es igual al anterior. No hay cambios que guardar.', 'info');
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      text: `Cambiará el nombre de "${this.nivcarSeleccionado.dsNivcar}" a "${nombreTrimmed}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const nivcarActualizado: ParNivcarDto = {
          idNivcar: this.nivcarSeleccionado!.idNivcar,
          dsNivcar: nombreTrimmed,
          estNivcar: this.nivcarSeleccionado!.estNivcar
        };

        this.parNivcarService.editarNivcar(nivcarActualizado).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Actualizado!',
              text: 'El nivel de cargo ha sido actualizado correctamente.',
              icon: 'success',
              confirmButtonColor: '#0d6efd',
              timer: 2000,
              showConfirmButton: false
            });

            this.nivcarSeleccionado!.dsNivcar = nombreTrimmed;
            this.cargarNivcars.emit();
            this.nuevoNombre = '';
            this.cerrarModal();
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al actualizar el nivel del cargo.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
