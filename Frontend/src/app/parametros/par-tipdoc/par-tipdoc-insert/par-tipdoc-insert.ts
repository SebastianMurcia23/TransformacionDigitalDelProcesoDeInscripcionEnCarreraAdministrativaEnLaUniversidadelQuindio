import { Component, Output, EventEmitter } from '@angular/core';
import { ParTipDocService, ParTipdocDto } from '../../../service/ParTipdoc/par-tipdoc';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-par-tipdoc-ins',
  standalone: false,
  templateUrl: './par-tipdoc-insert.html',
  styleUrl: './par-tipdoc-insert.css'
})
export class ParTipdocInsert {

@Output() cargarTipdocs = new EventEmitter<void>();

nuevoTipdoc: ParTipdocDto = {
  id_tipdoc: 0,
  ds_tipdoc: '',
  est_tipdoc: true
 };

 constructor(private parTipdocService: ParTipDocService ) {}


  convertirMayusculas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const valor = input.value.toUpperCase();
    input.value = valor;
  }

 limpiarCampos(): void {
  this.nuevoTipdoc = {
    id_tipdoc: 0,
    ds_tipdoc: '',
    est_tipdoc: true
  };
 }
 cerrarModal(): void {
  (document.querySelector('#modalAgregar .btn-close') as HTMLElement)?.click();
 }
 guardarTipdoc(): void {

  this.nuevoTipdoc.ds_tipdoc = this.nuevoTipdoc.ds_tipdoc.trim();
  this.nuevoTipdoc.est_tipdoc = this.nuevoTipdoc.est_tipdoc;
  console.log('Valores actuales del tipo de documento:', this.nuevoTipdoc); 

  Swal.fire({
    title: '¿Desea guardar este tipo de documento?',
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
      this.parTipdocService.crearTipDoc(this.nuevoTipdoc).subscribe({
        next: (data) => {
          console.log('Tipo de documento guardado con éxito', data);

          Swal.fire({
            title: '¡Guardado!',
            text: 'El funcionario ha sido agregado correctamente.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            timer: 2000,
            showConfirmButton: false
          });

          this.cargarTipdocs.emit(); 
          this.nuevoTipdoc={
            id_tipdoc: 0,
            ds_tipdoc: '',
            est_tipdoc: true

           };
          this.cerrarModal();        
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al guardar el tipo de documento.',
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      });
    }

  });
}
    
}
