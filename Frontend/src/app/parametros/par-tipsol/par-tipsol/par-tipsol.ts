import { Component, OnInit } from '@angular/core';
import { InformacionTipsolDto, ParTipsolDto, ParTipsolService } from '../../../service/ParTipsol/par-tipsol';

@Component({
  selector: 'app-par-tipsol',
  standalone: false,
  templateUrl: './par-tipsol.html',
  styleUrl: './par-tipsol.css'
})
export class ParTipsol implements OnInit {

  tipsols: InformacionTipsolDto[] = [];
  tipsolSeleccionado: ParTipsolDto | null = null;

  constructor(private parTipsolService: ParTipsolService) {}

  ngOnInit(): void {
    this.cargarTipsols();
  }

  cargarTipsols(): void {
    this.parTipsolService.listarTipsols().subscribe({
      next: (data) => this.tipsols = data,
      error: (err)  => console.error('Error cargando tipsols', err)
    });
  }

  seleccionarTipsolParaEditar(tipsol: InformacionTipsolDto): void {
    this.tipsolSeleccionado = { ...tipsol };
  }
}