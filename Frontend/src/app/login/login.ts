import { Component } from '@angular/core';
import { AuthGoogle } from '../service/LoginService/auth-google';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private AuthGoogle : AuthGoogle){
  }
  
  login(){

    this.AuthGoogle.login();

  }

}
