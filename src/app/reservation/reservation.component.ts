import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarModule } from '../car.module';
import { NgbDate, NgbDatepickerConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../car.service';
import { Animations } from '../animations';
import { delay } from 'q';
import { HttpService } from '../http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  animations: [
    Animations
  ]
})
export class ReservationComponent implements OnInit {
  @ViewChild('f') reservationForm: NgForm;
  defaultCar = 'Please select type of car';
  @ViewChild('dpFrom') dpFrom: NgbDatepickerConfig;

  carModuleSubject = new BehaviorSubject<CarModule[]>([]);

carBase = [];
showedCars;


  constructor(public carService: CarService, public config: NgbCalendar, public httpService: HttpService) {
  }

  minDate = this.config.getToday();
  disabled = 'disabled';
  minDate2 = this.config.getToday();

  ngOnInit() {
    this.carService.getshowedCarsSubject().subscribe(value => this.showedCars = value);
  }

  typePick() {
     this.carService.setCarBase();
    (async () => {
      this.carService.carIsShowed.next(false);
      await delay(1000);
      this.carService.selectedCar.next(null);
      this.carBase = [];
  })();
  }

  datePick() {
    (async () => {
      this.carService.carIsShowed.next(false);
      await delay(1000);
      this.carService.selectedCar.next(null);
      this.carBase = [];

  })();
  this.disabled = null;
  this.minDate2 = this.reservationForm.value.userData.dpFrom;
  }

  showCars() {
    this.carService.selectedCar.next(null);
    const fromDate: NgbDate = this.reservationForm.value.userData.dpFrom;
    const toDate: NgbDate = this.reservationForm.value.userData.dpTo;
    const carType: string = this.reservationForm.value.userData.type;
    this.carBase = this.carService.showDateCars(fromDate, toDate, carType);
    this.carService.carIsShowed.next(true);
  }
}
