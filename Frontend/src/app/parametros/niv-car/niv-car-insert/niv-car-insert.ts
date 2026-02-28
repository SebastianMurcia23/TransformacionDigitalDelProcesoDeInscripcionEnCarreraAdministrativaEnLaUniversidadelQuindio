import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ParNivcarDto, ParNivcarService } from '../../../service/ParNivcar/par-nivcar';

@Component({
  selector: 'app-niv-car-insert',
  standalone: false,
  templateUrl: './niv-car-insert.html',
  styleUrl: './niv-car-insert.css'
})
export class NivCarInsert {




  @Output() cargarNivcars = new EventEmitter<void>();

  nuevoNivcar: ParNivcarDto = {
    idNivcar: 0,
    dsNivcar: '',
    estNivcar: true
  };

  constructor(private parNivcarService: ParNivcarService) { }

  convertirMayusculas(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const valor = input.value.toUpperCase();
    input.value = valor;
    this.nuevoNivcar.dsNivcar = valor;
  }

  limpiarCampos(): void {
    this.nuevoNivcar = {
      idNivcar: 0,
      dsNivcar: '',
      estNivcar: true
    };
  }
  cerrarModal(): void {
    (document.querySelector('#modalAgregar .btn-close') as HTMLElement)?.click();
  }
  guardarNivcar(): void {

    this.nuevoNivcar.dsNivcar = this.nuevoNivcar.dsNivcar.trim();
    this.nuevoNivcar.estNivcar = this.nuevoNivcar.estNivcar;
    console.log('Valores actuales del nivel de cargo:', this.nuevoNivcar);

    Swal.fire({
      title: '¿Desea guardar este nivel de cargo ?',
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
        this.parNivcarService.crearNivcar(this.nuevoNivcar).subscribe({
          next: (data) => {
            console.log('Nivel de cargo guardado con éxito', data);

            Swal.fire({
              title: '¡Guardado!',
              text: 'El nivel de cargo ha sido agregado correctamente.',
              icon: 'success',
              confirmButtonColor: '#28a745',
              timer: 2000,
              showConfirmButton: false
            });

            this.cargarNivcars.emit();
            this.nuevoNivcar = {
              idNivcar: 0,
              dsNivcar: '',
              estNivcar: true

            };
            this.cerrarModal();
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al guardar el nivel de cargo.',
              icon: 'error',
              confirmButtonColor: '#d33'
            });
          }
        });
      }

    });
  }

}
