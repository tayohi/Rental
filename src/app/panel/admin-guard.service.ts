import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.user) {
      const adminUID = this.authService.user.uid;
      console.log(adminUID);
      if (adminUID === 'LANL5b3YmSdZW9I3gIdYNUkI7e43') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
