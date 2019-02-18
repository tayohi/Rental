import { Injectable } from '@angular/core';
import { CarModule } from './car.module';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from './order.module';
import { CarService } from './car.service';
import { Subject } from 'rxjs';
import { HistoryOrderModule } from './history-order.module';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // new OrderModule(1, 1, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2019, 2, 3), new NgbDate(2019, 2, 4), new NgbDate(2019, 2, 5)]),
  // new OrderModule(2, 2, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2019, 2, 11), new NgbDate(2018, 12, 16), new NgbDate(2018, 12, 20)]),
  // new OrderModule(3, 3, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2018, 12, 15), new NgbDate(2018, 12, 16), new NgbDate(2018, 12, 22)]),
  // new OrderModule(4, 4, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2018, 12, 30), new NgbDate(2018, 12, 16), new NgbDate(2018, 12, 20)]),
  // new OrderModule(5, 5, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2018, 12, 1), new NgbDate(2018, 12, 2), new NgbDate(2018, 12, 20)]),
  // new OrderModule(6, 6, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2018, 12, 10), new NgbDate(2018, 12, 22), new NgbDate(2018, 12, 20)]),
  // new OrderModule(7, 7, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2018, 12, 10), new NgbDate(2018, 12, 22), new NgbDate(2018, 12, 20)]),
  // new OrderModule(8, 8, 'mateo', 'mateo', 'mateo@mateo', new NgbDate(1991, 7, 18),
  // [new NgbDate(2018, 12, 11), new NgbDate(2018, 12, 23), new NgbDate(2018, 12, 24)]),
  orders: OrderModule[] = [];

  historyOrders: HistoryOrderModule[] = [];

ordersChanged = new Subject<OrderModule[]>();
historyOrdersChanged = new Subject<HistoryOrderModule[]>();

  constructor(private carService: CarService, private httpService: HttpService) { }

  lastCheckData(dateFrom, dateTo, carId) {
    const from = new Date(dateFrom.year, dateFrom.month - 1, dateFrom.day);
    const to = new Date(dateTo.year, dateTo.month - 1, dateTo.day);
    const dayAmount = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24) + 1;
    const selectedCarBase = this.carService.carBase.filter(f => f.id === carId);
    const days = this.carService.countDays(from, dayAmount);
    const availableCars = this.carService.compareCars(days, selectedCarBase);
    return availableCars;
  }

  setOrders() {
    this.httpService.getOrders().subscribe(data => {
      this.orders = data;
      this.ordersChanged.next(this.orders.slice());
    }, error => console.log(error));
  }

  setHistoryOrders() {
    this.httpService.getHistoryOrders().subscribe(data => {
      this.historyOrders = data;
      this.historyOrdersChanged.next(this.historyOrders.slice());
    }, error => console.log(error));
  }


  getOrders() {
    return this.orders.slice();
  }
  getHistoryOrders() {
    return this.historyOrders.slice();
  }

  addOrder(order: OrderModule) {
    this.orders.push(order);
    this.ordersChanged.next(this.orders.slice());
    this.httpService.putOrder(order);
    }

  addHistoryOrder(order: HistoryOrderModule) {
    this.historyOrders.push(order);
    this.historyOrdersChanged.next(this.historyOrders.slice());
    this.httpService.putHistoryOrder(order);
  }

  deleteOrder(order: OrderModule) {
    this.orders = this.orders.filter(f => f.orderId !== order.orderId);
    this.ordersChanged.next(this.orders.slice());
    this.httpService.deleteOrder(order);
  }


}
