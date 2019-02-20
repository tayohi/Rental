import { Injectable, OnInit } from '@angular/core';
import { User } from '../../../node_modules/firebase';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Router } from '@angular/router';
import { CarService } from '../car.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  adminId = 'LANL5b3YmSdZW9I3gIdYNUkI7e43';
  public showEmailError;
  public showPassError;

  constructor(public angularFire: AngularFireAuth, private router: Router, private carService: CarService) {
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }


  login(email: string, password: string) {
    this.angularFire.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user.user.uid === this.adminId) {
          this.router.navigate(['/admin/orders']);
        } else {
          this.router.navigate(['/reserve']);
        }
        this.carService.checkOutCar = null;
      })
      .catch(err => {
        this.showEmailError = JSON.parse(JSON.stringify(err.message));
        console.log(this.showEmailError);
      });
  }

  signup(email: string, password: string) {
    this.angularFire.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user.user.uid === this.adminId) {
          this.router.navigate(['/admin/orders']);
        } else {
          this.router.navigate(['/reserve']);
        }
        this.carService.checkOutCar = null;
      })
      .catch(err => {
        this.showPassError = JSON.parse(JSON.stringify(err.message));
        console.log(this.showPassError);
      });
  }
  logout() {
    this.angularFire.auth.signOut();
    this.showEmailError = null;
  }
}
