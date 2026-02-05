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
import { NivCar } from './parametros/niv-car/niv-car';
import { ParTipdocInsert } from './parametros/par-tipdoc/par-tipdoc-insert/par-tipdoc-insert';
import { ParTipdocMostrar } from './parametros/par-tipdoc/par-tipdoc-mostrar/par-tipdoc-mostrar';

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
    NivCar,
    ParTipdocInsert,
    ParTipdocMostrar,
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
