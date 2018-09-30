import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  	
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
		  return true; 
    }else{
      let url: string = state.url;
      this.router.navigate(['/entrar'],{ queryParams: { redirect: url } })
	    return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.authService.isLoggedIn()) {
		  return true; 
    }else{
      let url: string = state.url;
      this.router.navigate(['/entrar'],{ queryParams: { redirect: url } })
	    return false;
    }
  }
} 