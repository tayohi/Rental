import { Component, OnInit } from '@angular/core';
import { OrderModule } from 'src/app/order.module';
import { CarService } from 'src/app/car.service';
import { OrderService } from 'src/app/order.service';
import { Subscription } from 'rxjs';
import { HistoryOrderModule } from 'src/app/history-order.module';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  subscription: Subscription;
  order: OrderModule;
  orders: OrderModule[];

  constructor(private carService: CarService, private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.orderService.ordersChanged
      .subscribe(
        (orders: OrderModule[]) => {
          this.orders = orders;
        }
      );
    this.orders = this.orderService.getOrders();
  }
  deleteOrder(order: OrderModule, state) {
    const newCarDate = this.carService.carBase.find(f => f.id === order.carId);
    order.reservation.forEach(element => {
      newCarDate.reservation = newCarDate.reservation.filter((element1) => {
        return JSON.stringify(element1) !== JSON.stringify(element);
      });
    });
    console.log(newCarDate);
    console.log(this.carService.carBase);
    this.carService.updateCar(newCarDate);
    this.orderService.deleteOrder(order);

    const historyOrder: HistoryOrderModule = {
      orderId: order.orderId,
      carId: order.carId,
      name: order.name,
      surname: order.surname,
      email: order.email,
      birthday: order.birthday,
      reservation: order.reservation,
      state: state
    };
    this.orderService.addHistoryOrder(historyOrder);


  }
}
