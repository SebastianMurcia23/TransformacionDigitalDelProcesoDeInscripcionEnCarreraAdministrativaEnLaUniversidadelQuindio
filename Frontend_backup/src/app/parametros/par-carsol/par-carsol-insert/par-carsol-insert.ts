import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { CrearCarsolDto, ParCarsolService } from '../../../service/ParCarsol/par-carsol';
import { ListarTipsolDto, ParTipsolService } from '../../../service/ParTipsol/par-tipsol';

@Component({
  selector: 'app-par-carsol-insert',
  standalone: false,
  templateUrl: './par-carsol-insert.html',
  styleUrl: './par-carsol-insert.css'
})
export class ParCarsolInsert implements OnInit {

  @Output() cargarCarsols = new EventEmitter<void>();

  tipsols: ListarTipsolDto[] = [];

  nuevoCarsol: CrearCarsolDto = {
    dsCarsol:  '',
    estCarsol: true,
    idTipsol:  ''
  };

  constructor(
    private parCarsolService: ParCarsolService,
    private parTipsolService: ParTipsolService
  ) {}

  ngOnInit(): void {
    this.parTipsolService.listarTipsols().subscribe({
      next: (data) => this.tipsols = data,
      error: (err)  => console.error('Error cargando tipos de solicitud', err)
    });
  }

  convertirMayusculas(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const valor = input.value.toUpperCase();
    input.value = valor;
    this.nuevoCarsol.dsCarsol = valor;
  }

  limpiarCampos(): void {
    this.nuevoCarsol = {
      dsCarsol:  '',
      estCarsol: true,
      idTipsol:  ''
    };
  }

  cerrarModal(): void {
    (document.querySelector('#modalAgregarCarsol .btn-close') as HTMLElement)?.click();
  }

  guardarCarsol(): void {
    this.nuevoCarsol.dsCarsol = this.nuevoCarsol.dsCarsol.trim();

    Swal.fire({
      title: '¿Desea guardar esta característica de solicitud?',
      text: 'Verifique que toda la información sea correcta antes de continuar.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.parCarsolService.crearCarsol(this.nuevoCarsol).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Guardado!',
            text: 'La característica de solicitud ha sido agregada correctamente.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            timer: 2000,
            showConfirmButton: false
          });
          this.cargarCarsols.emit();
          this.limpiarCampos();
          this.cerrarModal();
        },
        error: (err) => {
          console.error(err);
          const mensaje = err.error && typeof err.error === 'string'
            ? err.error
            : 'Ocurrió un error al guardar la característica de solicitud.';
          Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      });
    });
  }
}