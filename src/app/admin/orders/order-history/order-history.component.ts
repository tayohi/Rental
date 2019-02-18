import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { OrderModule } from 'src/app/order.module';
import { HistoryOrderModule } from 'src/app/history-order.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  subscription: Subscription;
  historyOrders: HistoryOrderModule[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.orderService.historyOrdersChanged
    .subscribe(
      (historyOrders: HistoryOrderModule[]) => {
        this.historyOrders = historyOrders;
      }
    );
  this.historyOrders = this.orderService.getHistoryOrders();
  }
}
