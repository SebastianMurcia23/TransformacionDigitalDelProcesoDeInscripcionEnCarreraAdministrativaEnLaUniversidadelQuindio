import { Component } from '@angular/core';
import { ParDesCarDto, ParDesCarService } from '../../../service/DesCar/des-car';
import { ParNivcarDto } from '../../../service/ParNivcar/par-nivcar';

@Component({
  selector: 'app-des-car',
  standalone: false,
  templateUrl: './des-car.html',
  styleUrl: './des-car.css'
})
export class DesCar {
  descar: ParDesCarDto[] = [];
  descarSeleccionado: ParDesCarDto | null = null;

  constructor(private parDesCarService: ParDesCarService) { }


  ngOnInit(): void {
    this.cargarDesCars();
  }
  seleccionarDesCarParaEditar(desCar: ParDesCarDto): void {
    this.descarSeleccionado = { ...desCar };
  }
  cargarDesCars(): void {
    this.parDesCarService.listarDesCars().subscribe({
      next: (data) => {
        console.log('DesCars cargados con éxito', data);
        this.descar = data;
      },
      error: (err) => console.error('Error cargando descars', err)
    });
  }
}
