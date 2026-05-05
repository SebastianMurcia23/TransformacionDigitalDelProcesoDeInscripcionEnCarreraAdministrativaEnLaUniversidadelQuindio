import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { ProcFuncionario } from './procesos/pro_funcio/proc-funcionario/proc-funcionario';
import { ProcAnotaciones } from './procesos/proc_anotaciones/proc-anotaciones/proc-anotaciones';
import { ProcAnotacionesInsAct } from './procesos/proc_anotaciones/proc-anotaciones-ins-act/proc-anotaciones-ins-act';
import { ProcFuncionarioInsert } from './procesos/pro_funcio/proc-funcionario-insert/proc-funcionario-insert';
import { Inicio } from './inicio/inicio';
import { ParTipdoc } from './parametros/par-tipdoc/par-tipdoc/par-tipdoc';
import { NivCar } from './parametros/niv-car/niv-car/niv-car';
import { DenCar } from './parametros/den-car/den-car/den-car';
import { DesCar } from './parametros/des-car/des-car/des-car';
import { ParTipsol } from './parametros/par-tipsol/par-tipsol/par-tipsol';
import { ParCarsol } from './parametros/par-carsol/par-carsol/par-carsol';

const routes: Routes = [

  {path:'', component: Login},
  {path:'login', component: Login},
  {path:'proc-funcionario', component: ProcFuncionario},
  {path:'proc-funcionario-insert', component : ProcFuncionarioInsert},
  {path:'proc-anotaciones', component: ProcAnotaciones},
  {path:'proc-anotaciones-ins-act', component: ProcAnotacionesInsAct},
  {path:'inicio', component: Inicio},
  {path:'par-tipDoc', component: ParTipdoc},
  {path:'niv-car', component: NivCar},
  {path:'den-car', component: DenCar},
  {path:'des-car', component: DesCar},
  {path:'par-tipsol', component: ParTipsol},
  {path:'par-carsol', component: ParCarsol}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
