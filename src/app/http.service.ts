import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarModule } from './car.module';
import { OrderModule } from './order.module';
import { HistoryOrderModule } from './history-order.module';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  readonly apiKey = 'QAAljACl8Wtei2hGTRCPO-1xTKkjtdOc';
  readonly URL_DB_cars = 'https://api.mlab.com/api/1/databases/carrental/collections/carbase';
  readonly URL_DB_orders = 'https://api.mlab.com/api/1/databases/carrental/collections/orders';
  readonly URL_DB_history = 'https://api.mlab.com/api/1/databases/carrental/collections/historyorders';
  Id;
  readonly param: HttpParams;

  constructor(private http: HttpClient) { }

  getParametr(): HttpParams {
    return new HttpParams().set('apiKey', 'QAAljACl8Wtei2hGTRCPO-1xTKkjtdOc');
  }
  getParametrUpdate(): HttpParams {
    return new HttpParams().set('apiKey', 'QAAljACl8Wtei2hGTRCPO-1xTKkjtdOc').append('q', JSON.stringify(this.Id));
  }

  getCarDate(): Observable<CarModule[]> {
    return this.http.get<CarModule[]>(this.URL_DB_cars, { params: this.getParametr() }).pipe(map(response => response));
  }

  getOrders(): Observable<OrderModule[]> {
    return this.http.get<OrderModule[]>(this.URL_DB_orders, { params: this.getParametr() }).pipe(map(response => response));
  }
  getHistoryOrders(): Observable<HistoryOrderModule[]> {
    return this.http.get<HistoryOrderModule[]>(this.URL_DB_history, { params: this.getParametr() }).pipe(map(response => response));
  }

  putCarDate(car: CarModule ) {
    this.http.post(this.URL_DB_cars, car, {params: this.getParametr()}).subscribe(data => {
      console.log(data);
    });
  }


  putOrder(order: OrderModule ) {
    this.http.post(this.URL_DB_orders, order, {params: this.getParametr()}).subscribe(data => {
      console.log(data);
    });
  }
  putHistoryOrder(order: HistoryOrderModule ) {
    this.http.post(this.URL_DB_history, order, {params: this.getParametr()}).subscribe(data => {
      console.log(data);
    });
  }


  updateCarDate(car: CarModule ) {
    this.Id = {'id': car.id};
    this.http.put(this.URL_DB_cars, car, {params: this.getParametrUpdate()}).subscribe(data => {
      console.log(data);
    });
  }

  deleteCarDate(car: CarModule ) {
    this.Id = {'id': car.id};
    this.http.put(this.URL_DB_cars, [], {params: this.getParametrUpdate()}).subscribe(data => {
      console.log(data);
    });
  }

  deleteOrder(order: OrderModule ) {
    this.Id = {'orderId': order.orderId};
    this.http.put(this.URL_DB_orders, [], {params: this.getParametrUpdate()}).subscribe(data => {
      console.log(data);
    });
  }
}
