import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { IntroComponent } from './intro/intro.component';
import { CheckoutComponent } from './reservation/checkout/checkout.component';
import { AuthGuardService } from './reservation/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrdersListComponent } from './admin/orders/orders-list/orders-list.component';
import { OrderHistoryComponent } from './admin/orders/order-history/order-history.component';
import { ChooseOrderComponent } from './admin/orders/choose-order/choose-order.component';
import { CarsComponent } from './cars/cars.component';
import { ChooseComponent } from './cars/choose/choose.component';
import { LuxComponent } from './cars/lux/lux.component';
import { PersonalComponent } from './cars/personal/personal.component';
import { TransportComponent } from './cars/transport/transport.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  {
    path: '',
    component: IntroComponent, data: { animation: 'home'},
  },
  {
    path: 'cars', component: CarsComponent, data: { animation: 'carsanimation' }, children: [
      { path: '', component: ChooseComponent, data: { animation: 'choosecars' } },
      { path: 'luxurious', component: LuxComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'transport', component: TransportComponent }
    ]
  },

  {
    path: 'reserve', component: ReservationComponent, children: [
      {
        path: 'checkout', component: CheckoutComponent,
        canActivate: [AuthGuardService]
      },
    ]
  },
  {
    path: 'contact', component: ContactComponent, data: { animation: 'contact' }
  },
  {
    path: 'admin', component: AdminComponent, data: { animation: 'admin' }, children: [
      { path: 'cars', component: AdminCarsComponent, data: { animation: 'admincars' } },
      {
        path: 'orders', component: OrdersComponent, data: { animation: 'adminorders' }, children: [
          { path: '', component: ChooseOrderComponent },
          { path: 'orderslist', component: OrdersListComponent },
          { path: 'historylist', component: OrderHistoryComponent }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    {
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
