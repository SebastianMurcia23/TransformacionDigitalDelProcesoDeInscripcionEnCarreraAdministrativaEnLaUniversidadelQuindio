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
  tipdoc: ParTipdocDto[] = [];
  tipdocSeleccionado!: ParTipdocDto;


  constructor(private parTipDocService: ParTipDocService) { }


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
      },
      error: (err) => console.error('Error cargando tipdocs', err)
    });
  }
}