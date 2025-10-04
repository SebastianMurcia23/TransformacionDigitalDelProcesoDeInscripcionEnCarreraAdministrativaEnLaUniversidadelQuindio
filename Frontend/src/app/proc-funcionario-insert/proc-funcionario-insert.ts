import { Component } from '@angular/core';
import { PaisDto, ParPaisesService } from '../service/ParPaises/par-paises';
import { ParGeneroService, ParGeneroDto } from '../service/ParGenero/par-genero';
import { ParDepartService, ListarDepartDto } from '../service/ParDepart/par-depart';
import { ParTipDocService, ParTipdocDto } from '../service/ParTipdoc/par-tipdoc';

@Component({
  selector: 'app-proc-funcionario-insert',
  standalone: false,
  templateUrl: './proc-funcionario-insert.html',
  styleUrl: './proc-funcionario-insert.css'
})
export class ProcFuncionarioInsert {
  paises: PaisDto[] = [];
  generos: ParGeneroDto[] = [];
  departamentos: ListarDepartDto[] = [];
  tipDocs: ParTipdocDto[] = [];
  
  constructor(
    private parPaises: ParPaisesService,
    private parGeneros: ParGeneroService,
    private parDepart: ParDepartService,
    private parTipdoc: ParTipDocService

  ) {}

  ngOnInit(): void {
    this.cargarPaises();
    this.cargarGeneros();
    this.cargarParTipDocs();
  }

  cargarParTipDocs(): void {
    this.parTipdoc.listarTipDocs().subscribe({
      next: (data) => this.tipDocs = data,
      error: (err) => console.error('Error cargando tipos de documento', err)
    });
  }

  cargarGeneros(): void {
    this.parGeneros.listarGeneros().subscribe({
      next: (data) => this.generos = data,
      error: (err) => console.error('Error cargando generos', err)
    });
  }

  cargarPaises(): void {
    this.parPaises.listarPaises().subscribe({
      next: (data) => this.paises = data,
      error: (err) => console.error('Error cargando paises', err)
    });
  }

  onPaisChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const idPais = Number(target.value);
    this.departamentos = [];
    if (idPais) {
      this.cargarDepartamentosPorPais(idPais);
    }
  }

  cargarDepartamentosPorPais(idPais: number): void {
    this.parDepart.listarDepartamentosPorPais(idPais).subscribe({
      next: (data) => this.departamentos = data,
      error: (err) => console.error('Error cargando departamentos', err)
    });
  }

}
