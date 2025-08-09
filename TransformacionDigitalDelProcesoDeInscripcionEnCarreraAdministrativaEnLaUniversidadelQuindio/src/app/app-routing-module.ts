import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Main } from './main/main';
import { ProcFuncionario } from './proc-funcionario/proc-funcionario';
import { ProcAnotaciones } from './proc-anotaciones/proc-anotaciones';
import { ProcAnotacionesInsAct } from './proc-anotaciones-ins-act/proc-anotaciones-ins-act';
import { ProcFuncionarioInsert } from './proc-funcionario-insert/proc-funcionario-insert';

const routes: Routes = [

  {path:'', component: Login},
  {path:'login', component: Login},
  {path:'main', component: Main},
  {path:'proc-funcionario', component: ProcFuncionario },
  {path:'proc-funcionario-insert', component : ProcFuncionarioInsert},
  {path:'proc-anotaciones', component: ProcAnotaciones}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
