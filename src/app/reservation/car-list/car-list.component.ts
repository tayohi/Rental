import { Component, OnInit, Input } from '@angular/core';
import { CarModule } from 'src/app/car.module';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  @Input() availableCar: CarModule;

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  selectCar() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    this.carService.selectedCar.next(this.availableCar);

  }

}
