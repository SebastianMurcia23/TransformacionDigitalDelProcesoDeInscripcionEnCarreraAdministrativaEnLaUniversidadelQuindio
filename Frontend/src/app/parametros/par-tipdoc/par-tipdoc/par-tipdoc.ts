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
  
    constructor(private parTipDocService: ParTipDocService) {}
  
  
    ngOnInit(): void {
      this.cargarTipDocs();
    }
  
    seleccionarParaEditar(tipDoc: ParTipdocDto) {
    this.tipDocSeleccionado = tipDoc;
    console.log('TipDoc seleccionado:', tipDoc);
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
  
    eliminarTipDoc(id: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el tipo de documento de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.parTipDocService.eliminarTipDoc(id).subscribe({
            next: () => {
              this.cargarTipDocs();
  
              Swal.fire({
                title: '¡Eliminado!',
                text: 'El tipo de documento ha sido eliminado correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                timer: 2000,
                showConfirmButton: false
              });
            },
            error: (err) => {
              console.error('Error eliminando tipo de documento', err);
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un problema al eliminar el tipo de documento.',
                icon: 'error',
                confirmButtonColor: '#d33'
              });
            }
          });
        }
      });
    }
}
