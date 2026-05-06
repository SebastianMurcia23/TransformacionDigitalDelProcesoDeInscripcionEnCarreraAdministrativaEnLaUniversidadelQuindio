import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParDesCarDto } from '../../../service/DesCar/des-car';
import { ListarCarsolDto, ParCarsolService } from '../../../service/ParCarsol/par-carsol';
import { InformacionTipsolDto, ParTipsolService } from '../../../service/ParTipsol/par-tipsol';
import { ProFuncioDto } from '../../../service/ProFuncio/pro-funcio';

@Component({
  selector: 'app-proc-anotaciones-ins-act',
  standalone: false,
  templateUrl: './proc-anotaciones-ins-act.html',
  styleUrl: './proc-anotaciones-ins-act.css'
})
export class ProcAnotacionesInsAct implements OnInit, OnChanges {

  @Input()  funcionario!:      ProFuncioDto;
  @Input()  descars:           ParDesCarDto[] = [];
  @Input()  visible:           boolean = false;
  @Output() cerrar =           new EventEmitter<void>();
  @Output() anotacionGuardada = new EventEmitter<any>();

  // Tipsoles
  tipsoles:           InformacionTipsolDto[] = [];
  tipsolSeleccionado: InformacionTipsolDto | null = null;

  // Carsoles
  carsolesDelTipsol:     ListarCarsolDto[] = [];
  carsolesSeleccionados: Set<number> = new Set();

  // Acto y fecha
  actoAdministrativo: string = '';
  fechaAnotacion:     string = '';

  // Fechas comisión (solo COM)
  fechaInicioComision:      string = '';
  fechaTerminacionComision: string = '';

  // Descar modal
  descarBusqueda:          string = '';
  descaresModal:           ParDesCarDto[] = [];
  descarModalSeleccionado: ParDesCarDto | null = null;

  // ID del tipsol activo para controlar la vista
  get idTipsolActivo(): string {
    return this.tipsolSeleccionado?.idTipsol ?? '';
  }

  get esCOM(): boolean { return this.idTipsolActivo === 'COM'; }
  get esACT(): boolean { return this.idTipsolActivo === 'ACT'; }
  get esCAN(): boolean { return this.idTipsolActivo === 'CAN'; }

  constructor(
    private parTipsolService: ParTipsolService,
    private parCarsolService: ParCarsolService
  ) {}

  ngOnInit(): void {
    this.parTipsolService.listarTipsols().subscribe({
      next:  (data) => this.tipsoles = data,
      error: (err)  => console.error('Error cargando tipsoles', err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.reset();
      this.descaresModal = [...this.descars];
    }
    if (changes['descars']) {
      this.descaresModal = [...this.descars];
    }
  }

  // ── Tipsoles filtrados por el funcionario ─────────────────────────────────

  get tipsolesDelFuncionario(): InformacionTipsolDto[] {
    if (!this.funcionario) return [];
    const ids: string[] = (this.funcionario as any).idTipsoles ?? [];
    if (!ids.length) return this.tipsoles;
    return this.tipsoles.filter(t => ids.includes(t.idTipsol));
  }

  // ── Cambio de tipsol ──────────────────────────────────────────────────────

  onTipsolChange(idTipsol: string): void {
    this.tipsolSeleccionado       = this.tipsoles.find(t => t.idTipsol === idTipsol) ?? null;
    this.carsolesSeleccionados    = new Set();
    this.carsolesDelTipsol        = [];
    this.fechaInicioComision      = '';
    this.fechaTerminacionComision = '';

    if (!idTipsol) return;

    this.parCarsolService.listarCarsols().subscribe({
      next:  (data) => this.carsolesDelTipsol = data.filter(
        c => c.nombreTipsol === this.tipsolSeleccionado?.dsTipsol
      ),
      error: (err)  => console.error('Error cargando carsols', err)
    });
  }

  // ── Checkboxes carsol ─────────────────────────────────────────────────────

  toggleCarsol(idCarsol: number): void {
    this.carsolesSeleccionados.has(idCarsol)
      ? this.carsolesSeleccionados.delete(idCarsol)
      : this.carsolesSeleccionados.add(idCarsol);
  }

  isCarsolChecked(idCarsol: number): boolean {
    return this.carsolesSeleccionados.has(idCarsol);
  }

  // ── Búsqueda descar ───────────────────────────────────────────────────────

  buscarDescarModal(): void {
    const q = this.descarBusqueda.trim().toLowerCase();
    if (!q) { this.descaresModal = [...this.descars]; return; }
    this.descaresModal = this.descars.filter(d =>
      d.dsDescar.toLowerCase().includes(q) ||
      d.cdDescar.toString().includes(q)
    );
  }

  seleccionarDescarModal(descar: ParDesCarDto): void {
    this.descarModalSeleccionado = descar;
    this.descarBusqueda  = descar.dsDescar;
    this.descaresModal   = [];
  }

  limpiarDescar(): void {
    this.descarModalSeleccionado = null;
    this.descarBusqueda = '';
    this.descaresModal  = [...this.descars];
  }

  // ── Guardar ───────────────────────────────────────────────────────────────

  agregarAnotacion(): void {
    if (!this.tipsolSeleccionado) {
      alert('Debe seleccionar un tipo de anotación.'); return;
    }
    if (!this.actoAdministrativo.trim()) {
      alert('Debe ingresar el acto administrativo.'); return;
    }
    if (!this.fechaAnotacion) {
      alert('Debe ingresar la fecha.'); return;
    }
    if (this.esCOM && (!this.fechaInicioComision || !this.fechaTerminacionComision)) {
      alert('Debe ingresar las fechas de comisión.'); return;
    }

    const payload: any = {
      idFuncio:              this.funcionario.id_funcio,
      idTipsol:              this.tipsolSeleccionado.idTipsol,
      carsolesSeleccionados: Array.from(this.carsolesSeleccionados),
      actoAdministrativo:    this.actoAdministrativo,
      fecha:                 this.fechaAnotacion,
      idDescar:              this.descarModalSeleccionado?.idDescar ?? null
    };

    if (this.esCOM) {
      payload.fechaInicioComision      = this.fechaInicioComision;
      payload.fechaTerminacionComision = this.fechaTerminacionComision;
    }

    console.log('Anotación a guardar:', payload);
    this.anotacionGuardada.emit(payload);
    this.onCerrar();
  }

  // ── Cerrar ────────────────────────────────────────────────────────────────

  onCerrar(): void {
    this.reset();
    this.cerrar.emit();
  }

  private reset(): void {
    this.tipsolSeleccionado       = null;
    this.carsolesDelTipsol        = [];
    this.carsolesSeleccionados    = new Set();
    this.actoAdministrativo       = '';
    this.fechaAnotacion           = '';
    this.fechaInicioComision      = '';
    this.fechaTerminacionComision = '';
    this.descarBusqueda           = '';
    this.descarModalSeleccionado  = null;
    this.descaresModal            = [...this.descars];
  }
}