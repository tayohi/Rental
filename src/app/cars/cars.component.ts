import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Animations } from '../animations';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  animations: [Animations],
})
export class CarsComponent implements OnInit, AfterViewInit {
  loading = false;

  constructor(private router: Router, private route: ActivatedRoute, private scrollToService: ScrollToService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loading = true;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
