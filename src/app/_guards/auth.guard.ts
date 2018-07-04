import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  	
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	if (this.authService.isLoggedIn()) {
		return true; 
    }
    let url: string = state.url;
    this.router.navigate(['/entrar'],{ queryParams: { redirect: url } })
	return false;
  }
} 
/*
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/entrar']);
        return false;
    }
}*/