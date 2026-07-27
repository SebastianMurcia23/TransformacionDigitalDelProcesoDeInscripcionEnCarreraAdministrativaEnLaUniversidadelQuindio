import { Component, OnInit } from '@angular/core';
import { ProFuncioDto, ProFuncioService } from '../../../service/ProFuncio/pro-funcio';
import { ParDesCarDto, ParDesCarService } from '../../../service/DesCar/des-car';
import { ListarAnotacionDto, ProAnotacionService } from '../../../service/proAnotacion/pro-anotacion.service';


@Component({
  selector: 'app-proc-anotaciones',
  standalone: false,
  templateUrl: './proc-anotaciones.html',
  styleUrl: './proc-anotaciones.css'
})
export class ProcAnotaciones implements OnInit {

  // ── Búsqueda ──────────────────────────────────────────────────────────────
  searchId:             string         = '';
  funcionarios:         ProFuncioDto[] = [];
  todosLosFuncionarios: ProFuncioDto[] = [];
  descars:              ParDesCarDto[] = [];

  funcionarioSeleccionado: ProFuncioDto | null = null;
  descarSeleccionado:      ParDesCarDto | null = null;

  // ── Modal ─────────────────────────────────────────────────────────────────
  mostrarModal: boolean = false;

  // ── Anotaciones ───────────────────────────────────────────────────────────
  anotacionesAgrupadas: { idTipsol: string; dsTipsol: string; items: ListarAnotacionDto[] }[] = [];
  acordeonAbierto:      string | null = null;

  constructor(
    private proFuncioService:    ProFuncioService,
    private parDesCarService:    ParDesCarService,
    private proAnotacionService: ProAnotacionService
  ) {}

  ngOnInit(): void {
    this.cargarFuncionarios();
    this.cargarDescars();
  }

  cargarFuncionarios(): void {
    this.proFuncioService.listarFuncionarios().subscribe({
      next:  (data) => { this.todosLosFuncionarios = data; this.funcionarios = []; },
      error: (err)  => console.error('Error cargando funcionarios', err)
    });
  }

  cargarDescars(): void {
    this.parDesCarService.listarDesCars().subscribe({
      next:  (data) => this.descars = data,
      error: (err)  => console.error('Error cargando descars', err)
    });
  }

  buscarFuncionario(): void {
    const search = this.searchId.trim();
    this.funcionarioSeleccionado = null;
    this.descarSeleccionado      = null;
    this.anotacionesAgrupadas    = [];
    this.acordeonAbierto         = null;

    if (!search) { this.funcionarios = []; return; }

    this.funcionarios = this.todosLosFuncionarios.filter(f =>
      f.id_funcio.toString().startsWith(search)
    );
  }

  seleccionarFuncionario(funcionario: ProFuncioDto): void {
    this.funcionarioSeleccionado = funcionario;
    this.funcionarios = [];
    this.searchId = funcionario.id_funcio.toString();

    this.descarSeleccionado = funcionario.id_descar
      ? this.descars.find(d => d.idDescar === funcionario.id_descar) ?? null
      : null;

    this.cargarAnotaciones(funcionario.id_funcio);
  }

  cargarAnotaciones(idFuncio: number): void {
    this.proAnotacionService.listarPorFuncionario(idFuncio).subscribe({
      next:  (data) => this.agrupar(data),
      error: (err)  => console.error('Error cargando anotaciones', err)
    });
  }

  private agrupar(lista: ListarAnotacionDto[]): void {
    const mapa = new Map<string, { idTipsol: string; dsTipsol: string; items: ListarAnotacionDto[] }>();
    for (const a of lista) {
      if (!mapa.has(a.idTipsol)) {
        mapa.set(a.idTipsol, { idTipsol: a.idTipsol, dsTipsol: a.dsTipsol, items: [] });
      }
      mapa.get(a.idTipsol)!.items.push(a);
    }
    this.anotacionesAgrupadas = Array.from(mapa.values());
  }

  toggleAcordeon(idTipsol: string): void {
    this.acordeonAbierto = this.acordeonAbierto === idTipsol ? null : idTipsol;
  }

  limpiarSeleccion(): void {
    this.funcionarioSeleccionado = null;
    this.descarSeleccionado      = null;
    this.funcionarios            = [];
    this.searchId                = '';
    this.mostrarModal            = false;
    this.anotacionesAgrupadas    = [];
    this.acordeonAbierto         = null;
  }

  abrirModal():  void { this.mostrarModal = true;  }
  cerrarModal(): void { this.mostrarModal = false; }

  onAnotacionGuardada(_payload: any): void {
    if (this.funcionarioSeleccionado) {
      this.cargarAnotaciones(this.funcionarioSeleccionado.id_funcio);
    }
  }

  eliminarAnotacion(idAnotacion: number): void {
    if (!confirm('¿Desea eliminar esta anotación?')) return;
    this.proAnotacionService.eliminar(idAnotacion).subscribe({
      next:  () => {
        if (this.funcionarioSeleccionado) {
          this.cargarAnotaciones(this.funcionarioSeleccionado.id_funcio);
        }
      },
      error: (err) => console.error('Error eliminando anotación', err)
    });
  }
}