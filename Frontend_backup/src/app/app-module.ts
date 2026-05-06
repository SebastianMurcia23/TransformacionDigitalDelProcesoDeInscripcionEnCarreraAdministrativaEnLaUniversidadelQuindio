import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './login/login';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { ProcFuncionario } from './procesos/pro_funcio/proc-funcionario/proc-funcionario';
import { FormsModule } from '@angular/forms';
import { ProcFuncionarioInsert } from './procesos/pro_funcio/proc-funcionario-insert/proc-funcionario-insert';
import { ProcAnotaciones } from './procesos/proc_anotaciones/proc-anotaciones/proc-anotaciones';
import { ProcAnotacionesInsAct } from './procesos/proc_anotaciones/proc-anotaciones-ins-act/proc-anotaciones-ins-act';
import { Inicio } from './inicio/inicio';
import { ProcFuncionarioEdit } from './procesos/pro_funcio/proc-funcionario-edit/proc-funcionario-edit';
import { ProcFuncionarioMostrar } from './procesos/pro_funcio/proc-funcionario-mostrar/proc-funcionario-mostrar';
import { ParTipdoc } from './parametros/par-tipdoc/par-tipdoc/par-tipdoc';
import { ParTipdocInsert } from './parametros/par-tipdoc/par-tipdoc-insert/par-tipdoc-insert';
import { ParTipdocEdit } from './parametros/par-tipdoc/par-tipdoc-edit/par-tipdoc-edit';
import { NivCar } from './parametros/niv-car/niv-car/niv-car';
import { ParNivcarEdit } from './parametros/niv-car/par-nivcar-edit/par-nivcar-edit';
import { NivCarInsert } from './parametros/niv-car/niv-car-insert/niv-car-insert';
import { DenCar } from './parametros/den-car/den-car/den-car';
import { DenCarInsert } from './parametros/den-car/den-car-insert/den-car-insert';
import { DenCarEdit } from './parametros/den-car/den-car-edit/den-car-edit';
import { DesCar } from './parametros/des-car/des-car/des-car';
import { DesCarEdit } from './parametros/des-car/des-car-edit/des-car-edit/des-car-edit';
import { DesCarInsert } from './parametros/des-car/des-car-insert/des-car-insert';
import { ParTipsol } from './parametros/par-tipsol/par-tipsol/par-tipsol';
import { ParTipsolEdit } from './parametros/par-tipsol/par-tipsol-edit/par-tipsol-edit';
import { ParTipsolInsert } from './parametros/par-tipsol/par-tipsol-insert/par-tipsol-insert';
import { ParCarsol } from './parametros/par-carsol/par-carsol/par-carsol';
import { ParCarsolInsert } from './parametros/par-carsol/par-carsol-insert/par-carsol-insert';
import { ParCarsolEdit } from './parametros/par-carsol/par-carsol-edit/par-carsol-edit';

@NgModule({
  declarations: [
    App,
    Login,
    ProcFuncionario,
    ProcFuncionarioInsert,
    ProcAnotaciones,
    ProcAnotacionesInsAct,
    Inicio,
    ProcFuncionarioEdit,
    ProcFuncionarioMostrar,
    ParTipdoc,
    ParTipdocInsert,
    ParTipdocEdit,
    NivCar,
    ParNivcarEdit,
    NivCarInsert,
    DenCar,
    DenCarInsert,
    DenCarEdit,
    DesCar,
    DesCarEdit,
    DesCarInsert,
    ParTipsol,
    ParTipsolEdit,
    ParTipsolInsert,
    ParCarsol,
    ParCarsolInsert,
    ParCarsolEdit

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
