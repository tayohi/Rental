import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CarService } from '../car.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private carService: CarService, private router: Router) { }

canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

  if (this.carService.checkOutCar !== null) {
    return true;
  }
  this.router.navigate(['/reserve']);
  return false;
}
}
