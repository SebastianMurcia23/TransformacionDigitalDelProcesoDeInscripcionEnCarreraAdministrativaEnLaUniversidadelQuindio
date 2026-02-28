import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ParDenCarDto, ParDenCarService } from '../../../service/DenCar/den-car';

@Component({
  selector: 'app-den-car-insert',
  standalone: false,
  templateUrl: './den-car-insert.html',
  styleUrl: './den-car-insert.css'
})
export class DenCarInsert {

  @Output() cargarDencars = new EventEmitter<void>();

  nuevoDencar: ParDenCarDto = {
    idDencar: 0,
    dsDencar: '',
    estDencar: true
  };

  constructor(private parDenCarService: ParDenCarService) { }


  convertirMayusculas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const valor = input.value.toUpperCase();
    input.value = valor;
    this.nuevoDencar.dsDencar = valor;
  }

  limpiarCampos(): void {
    this.nuevoDencar = {
      idDencar: 0,
      dsDencar: '',
      estDencar: true
    };
  }
  cerrarModal(): void {
    (document.querySelector('#modalAgregar .btn-close') as HTMLElement)?.click();
  }
  guardarDencar(): void {

    this.nuevoDencar.dsDencar = this.nuevoDencar.dsDencar.trim();
    this.nuevoDencar.estDencar = this.nuevoDencar.estDencar;
    console.log('Valores actuales de la denominación de cargo:', this.nuevoDencar);

    Swal.fire({
      title: '¿Desea guardar esta denominación de cargo?',
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
        this.parDenCarService.crearDenCar(this.nuevoDencar).subscribe({
          next: (data) => {
            console.log('Denominación de cargo guardada con éxito', data);

            Swal.fire({
              title: '¡Guardado!',
              text: 'La denominación de cargo ha sido agregada correctamente.',
              icon: 'success',
              confirmButtonColor: '#28a745',
              timer: 2000,
              showConfirmButton: false
            });

            this.cargarDencars.emit();
            this.nuevoDencar = {
              idDencar: 0,
              dsDencar: '',
              estDencar: true

            };
            this.cerrarModal();
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al guardar la denominación de cargo.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }

    });
  }

}
