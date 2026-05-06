import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import Swal from 'sweetalert2';
import { ParDenCarDto, ParDenCarService } from '../../../service/DenCar/den-car';
import { ParDesCarService, CrearDesCarDto } from '../../../service/DesCar/des-car';
import { ParNivcarDto, ParNivcarService } from '../../../service/ParNivcar/par-nivcar';

@Component({
  selector: 'app-des-car-insert',
  standalone: false,
  templateUrl: './des-car-insert.html',
  styleUrl: './des-car-insert.css'
})
export class DesCarInsert implements OnInit {

  @Output() cargarDescars = new EventEmitter<void>();

  nuevoNombre:   string  = '';
  nuevoEstado:   boolean = true;
  nuevoCodigo:   number  = 0;
  nuevoGrado:    number  = 0;
  nuevoIdNivcar: number  = 0;
  nuevoIdDencar: number  = 0;

  nivcars: ParNivcarDto[] = [];
  dencars: ParDenCarDto[] = [];

  constructor(
    private parDesCarService: ParDesCarService,
    private parNivcarService: ParNivcarService,
    private parDenCarService: ParDenCarService
  ) {}

  ngOnInit(): void {
    this.parNivcarService.listarNivcar().subscribe({
      next: (data) => this.nivcars = data,
      error: (err)  => console.error('Error cargando nivcars', err)
    });
    this.parDenCarService.listarDenCars().subscribe({
      next: (data) => this.dencars = data,
      error: (err)  => console.error('Error cargando dencars', err)
    });
  }

  convertirMayusculas(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    this.nuevoNombre = input.value.toUpperCase();
  }

  limpiarCampos(): void {
    this.nuevoNombre   = '';
    this.nuevoEstado   = true;
    this.nuevoCodigo   = 0;
    this.nuevoGrado    = 0;
    this.nuevoIdNivcar = 0;
    this.nuevoIdDencar = 0;
  }

  cerrarModal(): void {
    (document.querySelector('#modalAgregar .btn-close') as HTMLElement)?.click();
  }

  guardarDesCar(): void {
    const nombreTrimmed = this.nuevoNombre.trim();

    if (!nombreTrimmed) {
      Swal.fire('Advertencia', 'El nombre no puede estar vacío.', 'warning');
      return;
    }

    const dto: CrearDesCarDto = {
      cdDescar:  this.nuevoCodigo,
      grDescar:  this.nuevoGrado,
      dsDescar:  nombreTrimmed,
      estDescar: this.nuevoEstado,
      id_nivcar: this.nuevoIdNivcar,
      id_dencar: this.nuevoIdDencar
    };

    this.parDesCarService.crearDesCar(dto).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Creado!',
          text: 'La descripción de cargo ha sido registrada correctamente.',
          icon: 'success',
          confirmButtonColor: '#198754',
          timer: 2000,
          showConfirmButton: false
        });
        this.cargarDescars.emit();
        this.limpiarCampos();
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error del backend:', err);
        Swal.fire('Error', 'Ocurrió un error al registrar la descripción de cargo.', 'error');
      }
    });
  }
}