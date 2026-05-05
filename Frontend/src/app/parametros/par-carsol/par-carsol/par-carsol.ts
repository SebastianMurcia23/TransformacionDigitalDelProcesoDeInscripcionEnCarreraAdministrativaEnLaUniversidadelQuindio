import { Component, OnInit } from '@angular/core';
import { InformacionCarsolDto, ListarCarsolDto, ParCarsolService } from '../../../service/ParCarsol/par-carsol';

@Component({
  selector: 'app-par-carsol',
  standalone: false,
  templateUrl: './par-carsol.html',
  styleUrl: './par-carsol.css'
})
export class ParCarsol implements OnInit {

  carsols: ListarCarsolDto[] = [];
  carsolSeleccionado: InformacionCarsolDto | null = null;

  constructor(private parCarsolService: ParCarsolService) {}

  ngOnInit(): void {
    this.cargarCarsols();
  }

  cargarCarsols(): void {
    this.parCarsolService.listarCarsols().subscribe({
      next: (data) => this.carsols = data,
      error: (err)  => console.error('Error cargando carsols', err)
    });
  }

  seleccionarCarsolParaEditar(carsol: ListarCarsolDto): void {
    this.parCarsolService.obtenerCarsol(carsol.idCarsol).subscribe({
      next: (data) => this.carsolSeleccionado = data,
      error: (err)  => console.error('Error obteniendo carsol', err)
    });
  }
}