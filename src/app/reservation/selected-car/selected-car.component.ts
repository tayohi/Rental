import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from 'src/app/car.service';
import { Animations } from 'src/app/animations';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-car',
  templateUrl: './selected-car.component.html',
  styleUrls: ['./selected-car.component.scss'],
  animations: [
    Animations
  ],
})
export class SelectedCarComponent implements OnInit, OnDestroy {

  selectedCar;
  checkOutDate;
  carIsShowed = true;
  subscription: Subscription;

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.carService.getshowedCarsSubject().subscribe(value => this.carIsShowed = value);
    this.selectedCar = this.carService.selectedCar;
    this.checkOutDate = this.carService.checkOutDate;
    this.subscription = this.carService.selectedCar.subscribe(value => this.selectedCar = value);
    console.log(this.selectedCar);
     const test = this.carService.selectedCar.getValue();
     console.log(test);

  }

  confirmCar() {
    this.router.navigate(['checkout'], {relativeTo: this.route});
    this.carService.checkOutCar = this.selectedCar;
    this.carService.carIsShowed.next(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.carService.selectedCar.next(null);

  }
}
