import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogle {

  constructor(private OAuthService : OAuthService){

    this.initlogin();

  }

  initlogin(){
    const config : AuthConfig = {

      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '71083061665-ukpmspt3t1ur4jfp3192omct1nm4bt9n.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/main',
      scope: 'openid profile email',
    }

    this.OAuthService.configure(config);
    this.OAuthService.setupAutomaticSilentRefresh();
    this.OAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.OAuthService.initLoginFlow();
  }
  logout(){
    this.OAuthService.logOut();

  }
  getProfile(){
    return this.OAuthService.getIdentityClaims();
  }
}

