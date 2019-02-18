import { Component, OnInit } from '@angular/core';
import { Animations } from 'src/app/animations';
import { OrderService } from 'src/app/order.service';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [Animations]
})
export class OrdersComponent implements OnInit {


  constructor(private orderService: OrderService, private carService: CarService) { }

  ngOnInit() {
    this.orderService.setOrders();
    this.orderService.setHistoryOrders();
    this.carService.setCarBase();
  }


}
