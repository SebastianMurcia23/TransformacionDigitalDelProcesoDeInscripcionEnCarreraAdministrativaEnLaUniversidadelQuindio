import { Component, Input } from '@angular/core';
import { ProFuncioDto } from '../../../service/ProFuncio/pro-funcio';

@Component({
  selector: 'app-proc-funcionario-edit',
  standalone: false,
  templateUrl: './proc-funcionario-edit.html',
  styleUrl: './proc-funcionario-edit.css'
})
export class ProcFuncionarioEdit {
  @Input() funcionarioSeleccionado: ProFuncioDto | null = null;  
}
