import { Component, Input } from '@angular/core';
import { ProFuncioDto } from '../../../service/ProFuncio/pro-funcio';

@Component({
  selector: 'app-proc-funcionario-mostrar',
  standalone: false,
  templateUrl: './proc-funcionario-mostrar.html',
  styleUrl: './proc-funcionario-mostrar.css'
})
export class ProcFuncionarioMostrar {
  @Input() funcionarioSeleccionado: ProFuncioDto | null = null;
}
