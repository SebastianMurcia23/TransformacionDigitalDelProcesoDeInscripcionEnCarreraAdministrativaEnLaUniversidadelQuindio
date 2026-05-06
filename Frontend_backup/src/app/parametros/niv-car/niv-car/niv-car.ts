import { Component } from '@angular/core';
import { ParNivcarDto, ParNivcarService } from '../../../service/ParNivcar/par-nivcar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-niv-car',
  standalone: false,
  templateUrl: './niv-car.html',
  styleUrl: './niv-car.css'
})
export class NivCar {
  searchId: string = '';
  nivcar: ParNivcarDto[] = [];
  todosLosNivcars: ParNivcarDto[] = [];
  nivCarSeleccionado: ParNivcarDto | null = null;


  constructor(private parNivcarService: ParNivcarService) { }


  ngOnInit(): void {
    this.cargarNivcars();
  }
  seleccionarNivcarParaEditar(nivcar: ParNivcarDto): void {
    this.nivCarSeleccionado = { ...nivcar };
  }
  cargarNivcars(): void {
    this.parNivcarService.listarNivcar().subscribe({
      next: (data) => {
        console.log('Nivcars cargados con éxito', data);
        this.nivcar = data;
        this.todosLosNivcars = data;
      },
      error: (err) => console.error('Error cargando nivcars', err)
    });
  }

  buscarNivcars(): void {
    const search = this.searchId.trim();

    if (!search) {
      this.nivcar = this.todosLosNivcars;
      return;
    }

    this.nivcar = this.todosLosNivcars.filter(nivcar =>
      nivcar.idNivcar.toString().startsWith(search)
    );
  }
  cambiarEstadoNivcar(nivcar: ParNivcarDto) {

    const nuevoEstado = !nivcar.estNivcar;
    const mensaje = nuevoEstado
      ? '¿Está seguro de activar este nivel de carrera?'
      : '¿Está seguro de desactivar este nivel de carrera?';

    Swal.fire({
      title: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.parNivcarService.cambiarEstadoNivcar({
          idNivcar: nivcar.idNivcar,
          dsNivcar: nivcar.dsNivcar,
          estNivcar: nuevoEstado
        }).subscribe({

          next: () => {

            nivcar.estNivcar = nuevoEstado;

            Swal.fire({
              title: nuevoEstado ? '¡Activado!' : '¡Desactivado!',
              text: 'El estado se actualizó correctamente.',
              icon: 'success',
              confirmButtonColor: '#28a745',
              timer: 2000,
              showConfirmButton: false
            });
          },

          error: () => {
            Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
          }
        });
      }

    });
  }
}