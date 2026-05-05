import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { ParTipdocDto, ParTipDocService } from '../../../service/ParTipdoc/par-tipdoc';


@Component({
  selector: 'app-par-tipdoc-edit',
  standalone: false,
  templateUrl: './par-tipdoc-edit.html',
  styleUrls: ['./par-tipdoc-edit.css']
})
export class ParTipdocEdit {


  @Input() tipdocSeleccionado: ParTipdocDto | null = null;
  @Output() cargarTipdocs = new EventEmitter<void>();

  nuevoNombre: string = '';
  nuevoEstado: boolean = true;

  constructor(private parTipDocService: ParTipDocService) { }

  limpiarCampos(): void {
    this.nuevoNombre = '';
    this.nuevoEstado = this.tipdocSeleccionado?.est_tipdoc ?? true;
  }
  convertirMayusculas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const valor = input.value.toUpperCase();
    this.nuevoNombre = valor;
  }
  cerrarModal(): void {
    (document.querySelector('#modalEditar .btn-close') as HTMLElement)?.click();
  }
  guardarCambios(): void {
    if (!this.tipdocSeleccionado) {
      Swal.fire('Error', 'No hay tipo de documento seleccionado', 'error');
      return;
    }
    const nombreTrimmed = this.nuevoNombre.trim() || this.tipdocSeleccionado.ds_tipdoc;
    const estadoActual = this.nuevoEstado;
    if (
      nombreTrimmed === this.tipdocSeleccionado.ds_tipdoc &&
      estadoActual === this.tipdocSeleccionado.est_tipdoc
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
        if (result.isConfirmed) {
          const tipdocActualizado: ParTipdocDto = {
            id_tipdoc: this.tipdocSeleccionado!.id_tipdoc,
            ds_tipdoc: nombreTrimmed,
            est_tipdoc: estadoActual
          };
          this.parTipDocService.editarTipDoc(tipdocActualizado).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Actualizado!',
                text: 'El tipo de documento ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonColor: '#0d6efd',
                timer: 2000,
                showConfirmButton: false
              });
              this.tipdocSeleccionado!.ds_tipdoc = nombreTrimmed;
              this.tipdocSeleccionado!.est_tipdoc = estadoActual;
              this.cargarTipdocs.emit();
              this.limpiarCampos();
              this.cerrarModal();
            },
            error: (err) => {
              console.error(err);
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al actualizar el tipo de documento.',
                icon: 'error',
                confirmButtonColor: '#d33'
              });
            }
          });
          console.log('Datos enviados para actualización:', tipdocActualizado);
        }
      });
  }
}