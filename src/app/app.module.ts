import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IntroComponent } from './intro/intro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarListComponent } from './reservation/car-list/car-list.component';
import { SelectedCarComponent } from './reservation/selected-car/selected-car.component';
import { CarService } from './car.service';
import { CheckoutComponent } from './reservation/checkout/checkout.component';
import { AuthGuardService } from './reservation/auth-guard.service';
import { OrderService } from './order.service';
import { PersonalComponent } from './cars/personal/personal.component';
import { LuxComponent } from './cars/lux/lux.component';
import { TransportComponent } from './cars/transport/transport.component';
import { ChooseComponent } from './cars/choose/choose.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminCarsListComponent } from './admin/admin-cars/admin-cars-list/admin-cars-list.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrdersListComponent } from './admin/orders/orders-list/orders-list.component';
import { OrderHistoryComponent } from './admin/orders/order-history/order-history.component';
import { ChooseOrderComponent } from './admin/orders/choose-order/choose-order.component';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CarsComponent } from './cars/cars.component';
import { PanelComponent } from './panel/panel.component';
import { AuthService } from './panel/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginGuardService } from './panel/login-guard.service';
import { AdminGuardService } from './panel/admin-guard.service';
import { FooterComponent } from './footer/footer.component';




const config = {
  apiKey: 'AIzaSyADSfl0nSAFe-ZizgdnURuzGOOwsHBrNlU',
  authDomain: 'carrental-69c1b.firebaseapp.com',
  databaseURL: 'https://carrental-69c1b.firebaseio.com',
  projectId: 'carrental-69c1b',
  storageBucket: 'carrental-69c1b.appspot.com',
  messagingSenderId: '855635169092'
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsComponent,
    ReservationComponent,
    IntroComponent,
    CarListComponent,
    SelectedCarComponent,
    CheckoutComponent,
    PersonalComponent,
    LuxComponent,
    TransportComponent,
    ChooseComponent,
    ContactComponent,
    AdminComponent,
    AdminCarsComponent,
    AdminCarsListComponent,
    OrdersComponent,
    OrdersListComponent,
    OrderHistoryComponent,
    ChooseOrderComponent,
    PanelComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ScrollToModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [HttpService, CarService, OrderService, AuthGuardService, AuthService, LoginGuardService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
