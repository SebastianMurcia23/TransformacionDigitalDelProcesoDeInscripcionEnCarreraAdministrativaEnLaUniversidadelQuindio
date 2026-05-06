import { Component, signal } from '@angular/core';
import { AuthGoogle } from './service/LoginService/auth-google';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trabajo_grado');
  constructor(private AuthGoogle : AuthGoogle, public router : Router){
  }

  showParametros: boolean = false;
  showProcesos: boolean = false;
  showFuncionarios: boolean = false;
  showData(){
    const data  = JSON.stringify(this.AuthGoogle.getProfile())
    console.log(data);
  }
  
  logout(){

    this.AuthGoogle.logout();
    this.router.navigate(['login'])
  }

  arrowParametros() {
    this.showParametros = !this.showParametros;
    if (this.showParametros) {
    }
  }

  arrowProcesos() {
    this.showProcesos = !this.showProcesos;
    if (this.showProcesos) {
    }
  }

  inicio(){

    if (this.router.url === '/inicio'){
        this.showParametros = false;
        this.showProcesos = false;
    }

  }
}
