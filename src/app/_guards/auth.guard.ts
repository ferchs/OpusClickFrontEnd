import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';

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
}