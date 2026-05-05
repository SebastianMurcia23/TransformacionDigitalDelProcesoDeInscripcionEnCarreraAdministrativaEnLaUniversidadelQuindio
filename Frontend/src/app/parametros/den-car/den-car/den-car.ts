import { Component } from '@angular/core';
import { ParDenCarDto, ParDenCarService } from '../../../service/DenCar/den-car';

@Component({
  selector: 'app-den-car',
  standalone: false,
  templateUrl: './den-car.html',
  styleUrl: './den-car.css'
})
export class DenCar {
  dencar: ParDenCarDto[] = [];
  dencarSeleccionado: ParDenCarDto | null = null;


  constructor(private parDenCarService: ParDenCarService) { }


  ngOnInit(): void {
    this.cargarDenCars();
  }
  seleccionarDenCarParaEditar(denCar: ParDenCarDto): void {
    this.dencarSeleccionado = { ...denCar };
  }
  cargarDenCars(): void {
    this.parDenCarService.listarDenCars().subscribe({
      next: (data) => {
        console.log('DenCars cargados con éxito', data);
        this.dencar = data;
      },
      error: (err) => console.error('Error cargando dencars', err)
    });
  }
}
