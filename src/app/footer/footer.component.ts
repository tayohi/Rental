import { Component, OnInit } from '@angular/core';
import { Animations } from '../animations';
import { AuthService } from '../panel/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [Animations]
})
export class FooterComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
