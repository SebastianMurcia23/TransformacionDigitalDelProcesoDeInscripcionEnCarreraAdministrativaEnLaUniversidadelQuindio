import { Component } from '@angular/core';
import { ParTipDocService, ParTipdocDto } from '../../../service/ParTipdoc/par-tipdoc';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-par-tipdoc',
  standalone: false,
  templateUrl: './par-tipdoc.html',
  styleUrl: './par-tipdoc.css'
})
export class ParTipdoc {
    searchId: string = '';
    tipdoc: ParTipdocDto[] = [];
    todosLosTipdocs: ParTipdocDto[] = []; 
    tipDocSeleccionado: ParTipdocDto | null = null;
    tipdocSeleccionado!: ParTipdocDto;

  
    constructor(private parTipDocService: ParTipDocService) {}
  
  
    ngOnInit(): void {
      this.cargarTipDocs();
    }
    seleccionarTipdocParaEditar(tipdoc: ParTipdocDto): void {
      this.tipdocSeleccionado = { ...tipdoc };
    }
    cargarTipDocs(): void {
      this.parTipDocService.listarTipDocs().subscribe({
        next: (data) => {
          console.log('Tipdocs cargados con éxito', data);
          this.tipdoc = data;
          this.todosLosTipdocs = data;
        },
        error: (err) => console.error('Error cargando tipdocs', err)
      });
    }
  
    buscarTipdocs(): void {
      const search = this.searchId.trim();
  
      if (!search) {
        this.tipdoc = this.todosLosTipdocs;
        return;
      }
  
      this.tipdoc = this.todosLosTipdocs.filter(tipdoc =>
        tipdoc.id_tipdoc.toString().startsWith(search)
      );
    }
    cambiarEstadoTipDoc(tipdoc: ParTipdocDto) {

      const nuevoEstado = !tipdoc.est_tipdoc;
      const mensaje = nuevoEstado
        ? '¿Está seguro de activar este tipo de documento?'
        : '¿Está seguro de desactivar este tipo de documento?';

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

          this.parTipDocService.cambiarEstadoTipDoc({
            id_tipdoc: tipdoc.id_tipdoc,
            ds_tipdoc: tipdoc.ds_tipdoc,
            est_tipdoc: nuevoEstado
          }).subscribe({

            next: () => {

              tipdoc.est_tipdoc = nuevoEstado;

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