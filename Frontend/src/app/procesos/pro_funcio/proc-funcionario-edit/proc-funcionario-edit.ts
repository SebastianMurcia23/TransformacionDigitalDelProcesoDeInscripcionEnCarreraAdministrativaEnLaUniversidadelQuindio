import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProFuncioDto, ProFuncioService } from '../../../service/ProFuncio/pro-funcio';
import { ParDesCarService, ParDesCarDto } from '../../../service/DesCar/des-car';
import { ParGeneroService, ParGeneroDto } from '../../../service/ParGenero/par-genero';
import { ParTipDocService, ParTipdocDto } from '../../../service/ParTipdoc/par-tipdoc';
import { ParPaisesService, PaisDto } from '../../../service/ParPaises/par-paises';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proc-funcionario-edit',
  standalone: false,
  templateUrl: './proc-funcionario-edit.html',
  styleUrl: './proc-funcionario-edit.css'
})
export class ProcFuncionarioEdit implements OnInit, OnChanges {

  @Input() funcionarioSeleccionado: ProFuncioDto | null = null;
  @Output() cargarFuncionarios = new EventEmitter<void>();

  generos: ParGeneroDto[] = [];
  tipDocs: ParTipdocDto[] = [];
  paises: PaisDto[] = [];
  descars: ParDesCarDto[] = [];

  editForm: ProFuncioDto = this.formVacio();

  constructor(
    private proFuncioService: ProFuncioService,
    private parDesCarService: ParDesCarService,
    private parGeneroService: ParGeneroService,
    private parTipDocService: ParTipDocService,
    private parPaisesService: ParPaisesService
  ) { }

  ngOnInit(): void {
    this.parGeneroService.listarGeneros().subscribe({
      next: (data) => this.generos = data,
      error: (err) => console.error('Error cargando géneros', err)
    });
    this.parTipDocService.listarTipDocs().subscribe({
      next: (data) => this.tipDocs = data,
      error: (err) => console.error('Error cargando tipdocs', err)
    });
    this.parPaisesService.listarPaises().subscribe({
      next: (data) => this.paises = data,
      error: (err) => console.error('Error cargando países', err)
    });
    this.parDesCarService.listarDesCars().subscribe({
      next: (data) => this.descars = data,
      error: (err) => console.error('Error cargando descars', err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['funcionarioSeleccionado'] && this.funcionarioSeleccionado) {
      // Precarga el formulario con los datos actuales
      this.editForm = { ...this.funcionarioSeleccionado };
    }
  }

  convertirMayusculas(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    input.value = input.value.toUpperCase();
  }

  cerrarModal(): void {
    (document.querySelector('#modalEditar .btn-close') as HTMLElement)?.click();
  }

  limpiarForm(): void {
    if (this.funcionarioSeleccionado) {
      this.editForm = { ...this.funcionarioSeleccionado };
    }
  }

  guardarCambios(): void {
    if (!this.funcionarioSeleccionado) {
      Swal.fire('Error', 'No hay funcionario seleccionado.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Desea guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (!result.isConfirmed) return;

      const dto: ProFuncioDto = {
        ...this.editForm,
        id_funcio: this.funcionarioSeleccionado!.id_funcio, // ID no editable
        no_funcio: Number(this.editForm.no_funcio),
        id_descar: this.editForm.id_descar ?? null
      };

      this.proFuncioService.editarFuncionario(dto).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El funcionario ha sido actualizado correctamente.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            timer: 2000,
            showConfirmButton: false
          });
          this.cargarFuncionarios.emit();
          this.cerrarModal();
        },
        error: (err) => {
          console.error('Error al actualizar funcionario', err);
          Swal.fire('Error', 'Ocurrió un problema al actualizar el funcionario.', 'error');
        }
      });
    });
  }

  private formVacio(): ProFuncioDto {
    return {
      id_funcio: 0,
      id_tipdoc: 0,
      id_genero: 0,
      nm_func1: '',
      nm_func2: '',
      ap_func1: '',
      ap_func2: '',
      id_pais: 0,
      id_depart: 0,
      id_munici: 0,
      no_funcio: 0,
      ce_funcio: '',
      fechaExpedicion: null,
      id_descar: null
    };
  }
}