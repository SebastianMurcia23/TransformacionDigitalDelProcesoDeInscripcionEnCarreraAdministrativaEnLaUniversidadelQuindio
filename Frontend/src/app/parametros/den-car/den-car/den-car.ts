import { Component } from '@angular/core';
import { ParDenCarDto, ParDenCarService } from '../../../service/DenCar/den-car';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-den-car',
  standalone: false,
  templateUrl: './den-car.html',
  styleUrl: './den-car.css'
})
export class DenCar {
  searchId: string = '';
  dencar: ParDenCarDto[] = [];
  todosLosDenCars: ParDenCarDto[] = [];
  dencarSeleccionado: ParDenCarDto | null = null;


  constructor(private parDenCarService: ParDenCarService) { }


  ngOnInit(): void {
    this.cargarDenCars();
  }
  seleccionarDenCarParaEditar(denCar: ParDenCarDto): void {
    this.dencarSeleccionado = { ...denCar }; // Crear una copia para evitar mutaciones directas
  }
  cargarDenCars(): void {
    this.parDenCarService.listarDenCars().subscribe({
      next: (data) => {
        console.log('DenCars cargados con éxito', data);
        this.dencar = data;
        this.todosLosDenCars = data;
      },
      error: (err) => console.error('Error cargando dencars', err)
    });
  }

  buscarDenCars(): void {
    const search = this.searchId.trim();

    if (!search) {
      this.dencar = this.todosLosDenCars;
      return;
    }

    this.dencar = this.todosLosDenCars.filter(denCar =>
      denCar.idDencar.toString().startsWith(search)
    );
  }
  cambiarEstadoDenCar(denCar: ParDenCarDto) {

    const nuevoEstado = !denCar.estDencar;
    const mensaje = nuevoEstado
      ? '¿Está seguro de activar esta denominación de cargo?'
      : '¿Está seguro de desactivar esta denominación de cargo?';

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

        this.parDenCarService.cambiarEstadoDenCar({
          idDencar: denCar.idDencar,
          dsDencar: denCar.dsDencar,
          estDencar: nuevoEstado
        }).subscribe({

          next: () => {

            denCar.estDencar = nuevoEstado;

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
