import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParDesCarDto } from '../../../service/DesCar/des-car';
import { ListarCarsolDto, ParCarsolService } from '../../../service/ParCarsol/par-carsol';
import { InformacionTipsolDto, ParTipsolService } from '../../../service/ParTipsol/par-tipsol';
import { ProFuncioDto } from '../../../service/ProFuncio/pro-funcio';
import { ProAnotacionService, CrearAnotacionDto } from '../../../service/proAnotacion/pro-anotacion.service';

@Component({
  selector: 'app-proc-anotaciones-ins-act',
  standalone: false,
  templateUrl: './proc-anotaciones-ins-act.html',
  styleUrl: './proc-anotaciones-ins-act.css'
})
export class ProcAnotacionesInsAct implements OnInit, OnChanges {

  @Input()  funcionario!:       ProFuncioDto;
  @Input()  descars:            ParDesCarDto[] = [];
  @Input()  visible:            boolean = false;
  @Output() cerrar =            new EventEmitter<void>();
  @Output() anotacionGuardada = new EventEmitter<void>();

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

  // Descar
  descarBusqueda:          string = '';
  descaresModal:           ParDesCarDto[] = [];
  descarModalSeleccionado: ParDesCarDto | null = null;

  // Estado
  guardando: boolean = false;

  get idTipsolActivo(): string { return this.tipsolSeleccionado?.idTipsol ?? ''; }
  get esCOM(): boolean { return this.idTipsolActivo === 'COM'; }
  get esACT(): boolean { return this.idTipsolActivo === 'ACT'; }
  get esCAN(): boolean { return this.idTipsolActivo === 'CAN'; }

  constructor(
    private parTipsolService:    ParTipsolService,
    private parCarsolService:    ParCarsolService,
    private proAnotacionService: ProAnotacionService
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

  get tipsolesDelFuncionario(): InformacionTipsolDto[] {
    if (!this.funcionario) return [];
    const ids: string[] = (this.funcionario as any).idTipsoles ?? [];
    if (!ids.length) return this.tipsoles;
    return this.tipsoles.filter(t => ids.includes(t.idTipsol));
  }

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

  toggleCarsol(idCarsol: number): void {
    this.carsolesSeleccionados.has(idCarsol)
      ? this.carsolesSeleccionados.delete(idCarsol)
      : this.carsolesSeleccionados.add(idCarsol);
  }

  isCarsolChecked(idCarsol: number): boolean {
    return this.carsolesSeleccionados.has(idCarsol);
  }

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

    const dto: CrearAnotacionDto = {
      idFuncio:           this.funcionario.id_funcio,
      idTipsol:           this.tipsolSeleccionado.idTipsol,
      fechaAnotacion:     this.fechaAnotacion,
      actoAdministrativo: this.actoAdministrativo,
      idDescar:           this.descarModalSeleccionado?.idDescar ?? null,
      idCarsoles:         Array.from(this.carsolesSeleccionados),
      fechaIniComision:   this.esCOM ? this.fechaInicioComision      : null,
      fechaFinComision:   this.esCOM ? this.fechaTerminacionComision  : null
    };

    this.guardando = true;
    this.proAnotacionService.crear(dto).subscribe({
      next: () => {
        this.guardando = false;
        this.anotacionGuardada.emit();
        this.onCerrar();
      },
      error: (err) => {
        this.guardando = false;
        console.error('Error creando anotación', err);
        alert('Error al guardar la anotación.');
      }
    });
  }

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
    this.guardando                = false;
  }
}