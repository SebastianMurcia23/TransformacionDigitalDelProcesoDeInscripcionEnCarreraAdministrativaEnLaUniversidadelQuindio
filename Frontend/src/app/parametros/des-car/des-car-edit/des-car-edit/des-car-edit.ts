import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EditarDesCarDto, ParDesCarDto, ParDesCarService } from '../../../../service/DesCar/des-car';
import { ParNivcarDto, ParNivcarService } from '../../../../service/ParNivcar/par-nivcar';
import { ParDenCarDto, ParDenCarService } from '../../../../service/DenCar/den-car';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-des-car-edit',
  standalone: false,
  templateUrl: './des-car-edit.html',
  styleUrl: './des-car-edit.css'
})
export class DesCarEdit implements OnInit, OnChanges {

  @Input() descarSeleccionado: ParDesCarDto | null = null;
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
    this.cargarNivcars();
    this.cargarDencars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['descarSeleccionado'] && this.descarSeleccionado) {
      this.nuevoNombre   = this.descarSeleccionado.dsDescar;
      this.nuevoEstado   = this.descarSeleccionado.estDescar;
      this.nuevoCodigo   = this.descarSeleccionado.cdDescar;
      this.nuevoGrado    = this.descarSeleccionado.grDescar;
      this.nuevoIdNivcar = this.descarSeleccionado.id_nivcar;
      this.nuevoIdDencar = this.descarSeleccionado.id_dencar;
    }
  }

  cargarNivcars(): void {
    this.parNivcarService.listarNivcar().subscribe({
      next: (data) => this.nivcars = data,
      error: (err)  => console.error('Error cargando nivcars', err)
    });
  }

  cargarDencars(): void {
    this.parDenCarService.listarDenCars().subscribe({
      next: (data) => this.dencars = data,
      error: (err)  => console.error('Error cargando dencars', err)
    });
  }

  limpiarCampos(): void {
    if (this.descarSeleccionado) {
      this.nuevoNombre   = this.descarSeleccionado.dsDescar;
      this.nuevoEstado   = this.descarSeleccionado.estDescar;
      this.nuevoCodigo   = this.descarSeleccionado.cdDescar;
      this.nuevoGrado    = this.descarSeleccionado.grDescar;
      this.nuevoIdNivcar = this.descarSeleccionado.id_nivcar;
      this.nuevoIdDencar = this.descarSeleccionado.id_dencar;
    }
  }

  convertirMayusculas(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    this.nuevoNombre = input.value.toUpperCase();
  }

  cerrarModal(): void {
    (document.querySelector('#modalEditarDesCar .btn-close') as HTMLElement)?.click();
  }

  guardarCambios(): void {
    if (!this.descarSeleccionado) {
      Swal.fire('Error', 'No hay descripción de cargo seleccionada', 'error');
      return;
    }

    const nombreTrimmed = this.nuevoNombre.trim();

    if (!nombreTrimmed) {
      Swal.fire('Advertencia', 'El nombre no puede estar vacío.', 'warning');
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (!result.isConfirmed) return;

      const dto: EditarDesCarDto = {
        idDescar:  this.descarSeleccionado!.idDescar,
        cdDescar:  this.nuevoCodigo,
        grDescar:  this.nuevoGrado,
        dsDescar:  nombreTrimmed,
        estDescar: this.nuevoEstado,
        id_nivcar: this.nuevoIdNivcar,
        id_dencar: this.nuevoIdDencar
      };

      this.parDesCarService.editarDesCar(dto).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'La descripción de cargo ha sido actualizada correctamente.',
            icon: 'success',
            confirmButtonColor: '#198754',
            timer: 2000,
            showConfirmButton: false
          });
          this.cargarDescars.emit();
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error del backend:', err);
          Swal.fire('Error', 'Ocurrió un error al actualizar la descripción de cargo.', 'error');
        }
      });
    });
  }
}