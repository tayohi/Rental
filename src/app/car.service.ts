import { Injectable, OnInit } from '@angular/core';
import { CarModule } from './car.module';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { CarsComponent } from './cars/cars.component';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from './order.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  // new CarModule(1, 'Luxury', 'Ferrari F430', '5.0 Biturbo', 'Sport Type', 'Full of fuel',
  //   [new NgbDate(2019, 2, 3), new NgbDate(2019, 2, 4), new NgbDate(2019, 2, 5)]),
  // new CarModule(2, 'Personal', 'VW Golf', '1.4 TSI', 'Elegance', 'Winter tires',
  //   [new NgbDate(2019, 2, 11), new NgbDate(2018, 12, 16), new NgbDate(2018, 12, 20)]),
  // new CarModule(3, 'Transport', 'VW Transporter', '2.0 TDI', ' Type W4L4', 'Roof rack',
  //   [new NgbDate(2018, 12, 15), new NgbDate(2018, 12, 16), new NgbDate(2018, 12, 22)]),
  // new CarModule(4, 'Personal', 'VW Polo', '1.2 TSI', 'HighLine', 'Winter tires',
  //   [new NgbDate(2018, 12, 30), new NgbDate(2018, 12, 16), new NgbDate(2018, 12, 20)]),
  // new CarModule(5, 'Transport', 'Opel Vivaro', '2.0 DCI', ' Type W4L4', 'Roof rack',
  //   [new NgbDate(2018, 12, 1), new NgbDate(2018, 12, 2), new NgbDate(2018, 12, 20)]),
  // new CarModule(6, 'Transport', 'Ford Transit', '2.8 CDTI', ' Type W2L4', 'Winter tires',
  //   [new NgbDate(2018, 12, 10), new NgbDate(2018, 12, 22), new NgbDate(2018, 12, 20)]),
  // new CarModule(7, 'Transport', 'Fiat Ducato', '2.2 JTD', ' Type H2L4', 'Winter tires',
  //   [new NgbDate(2018, 12, 10), new NgbDate(2018, 12, 22), new NgbDate(2018, 12, 20)]),
  // new CarModule(8, 'Transport', 'Peugeot Boxer', '2.2 HDI', ' Type H1L1', 'Roof rack',
  //   [new NgbDate(2018, 12, 11), new NgbDate(2018, 12, 23), new NgbDate(2018, 12, 24)]),

  carBase: CarModule[] = [];
  selectedCar = new BehaviorSubject<CarModule>(null);
  carIsShowed = new BehaviorSubject<boolean>(false);
  carSubject = new BehaviorSubject<CarModule[]>([]);
  carChanged = new Subject<CarModule[]>();
  checkOutCar = null;
  checkOutDate;

  constructor(public calendat: NgbCalendar, public httpService: HttpService) {

  }


  setCarBase() {
    this.httpService.getCarDate().subscribe(data => {
      this.carBase = data;
      this.carChanged.next(this.carBase.slice());
    }, error => console.log(error));
  }

  getshowedCarsSubject(): Observable<boolean> {
    return this.carIsShowed.asObservable();
  }


  showDateCars(dateFrom, dateTo, carType) {
    const from = new Date(dateFrom.year, dateFrom.month - 1, dateFrom.day);
    const to = new Date(dateTo.year, dateTo.month - 1, dateTo.day);
    const dayAmount = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24) + 1;
    const selectedCarBase = this.carBase.filter(f => f.type === carType);
    const days = this.countDays(from, dayAmount);
    this.checkOutDate = days;
    const availableCars = this.compareCars(days, selectedCarBase);
    return availableCars;
  }

  compareCars(days, selectedCarBase) {
    const availableCars = [];
    let cars = [];

    for (const car of selectedCarBase) {
      days.forEach(element => {
        const index = car.reservation.findIndex(f =>
          f.day === element.day && f.month === element.month && f.year === element.year);
        if (index >= 0) {
          console.log('false', element, car);
        } else {
          console.log('true', element, car);
          cars.push(car);
        }
        if (cars.length === days.length) {
          cars = cars.slice(0, 1);
          availableCars.push(cars[0]);
          cars = [];
        }
      }
      );
      cars = [];
    }
    return availableCars;
  }

  countDays(from, dayAmount) {
    const days = [];
    for (let i = 0; i < dayAmount; i++) {
      const x = new Date(from.setDate(from.getDate() + 1));
      const date = (new NgbDate(x.getUTCFullYear(), x.getUTCMonth() + 1, x.getUTCDate()));
      days.push(date);
    }
    return days;
  }

  getCars() {
    return this.carBase.slice();
  }

  addCar(car: CarModule) {
    this.carBase.push(car);
    this.carChanged.next(this.carBase.slice());
    this.httpService.putCarDate(car);
  }

  deleteCar(car: CarModule) {
    this.carBase = this.carBase.filter(f => f.id !== car.id);
    this.carChanged.next(this.carBase.slice());
    this.httpService.deleteCarDate(car);

  }

  updateCar(car: CarModule) {
    const index = this.carBase.findIndex(f => f.id === car.id);
    this.carBase[index] = car;
    this.carChanged.next(this.carBase.slice());
    this.httpService.updateCarDate(car);
  }
}
