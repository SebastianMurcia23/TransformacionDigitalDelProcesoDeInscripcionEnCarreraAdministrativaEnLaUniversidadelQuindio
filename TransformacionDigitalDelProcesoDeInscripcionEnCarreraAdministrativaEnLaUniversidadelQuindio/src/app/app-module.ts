import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './login/login';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { ProcFuncionario } from './proc-funcionario/proc-funcionario';
import { FormsModule } from '@angular/forms';
import { ProcFuncionarioInsert } from './proc-funcionario-insert/proc-funcionario-insert';
import { ProcAnotaciones } from './proc-anotaciones/proc-anotaciones';
import { ProcAnotacionesInsAct } from './proc-anotaciones-ins-act/proc-anotaciones-ins-act';

@NgModule({
  declarations: [
    App,
    Login,
    ProcFuncionario,
    ProcFuncionarioInsert,
    ProcAnotaciones,
    ProcAnotacionesInsAct
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
