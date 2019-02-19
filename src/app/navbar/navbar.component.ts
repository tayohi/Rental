import { Component, OnInit } from '@angular/core';
import { AuthService } from '../panel/auth.service';
import { Router } from '@angular/router';
import { AdminGuardService } from '../panel/admin-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, public adminGuard: AdminGuardService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    }
}
