import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbDate, NgbDatepickerConfig, NgbCalendar, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/car.service';
import { NgForm } from '@angular/forms';
import { checkNoChanges } from '@angular/core/src/render3/instructions';
import { ModalDirective } from 'angular-bootstrap-md';
import { OrderService } from 'src/app/order.service';
import { OrderModule } from 'src/app/order.module';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('f') signupForm: NgForm;
  @ViewChild('content') content;
  @ViewChild('content2') content2;


  order: OrderModule = {
    orderId: 0,
    carId: 0,
    name: '',
    surname: '',
    email: '',
    birthday: new NgbDate(2000, 1, 1),
    reservation: [new NgbDate(2018, 12, 20)]
  };

  constructor(private carService: CarService, public config: NgbCalendar,
    public modalConfig: NgbModalConfig, private modalService: NgbModal, private orderSerivce: OrderService,
    private router: Router, private route: ActivatedRoute) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }

  date = this.config.getToday();
  minDate = new NgbDate(1920, 1, 1);
  maxDate = new NgbDate(this.date.year - 18, 1, 1);
  selectedCar;
  checkOutDate;



  ngOnInit() {
    this.selectedCar = this.carService.checkOutCar;
    this.checkOutDate = this.carService.checkOutDate;

  }

  ngOnDestroy() {
    this.carService.checkOutCar = null;
  }

  onSubmit() {

    let maxId = (Math.max(...this.orderSerivce.orders.map(f => f.orderId))) + 1;
    if (maxId < 1) {
      maxId = 1;
    }

    const x = this.orderSerivce.lastCheckData(this.checkOutDate[0],
      this.checkOutDate[(this.checkOutDate.length) - 1], this.selectedCar.id);
    if (x.length === 0) {
      this.modalService.open(this.content2, { centered: true, size: 'lg', windowClass: 'dark-modal' });
    } else {
      this.order.orderId = maxId;
      this.order.carId = this.selectedCar.id;
      this.order.name = this.signupForm.value.userData.name;
      this.order.surname = this.signupForm.value.userData.surname;
      this.order.email = this.signupForm.value.userData.email;
      this.order.birthday = this.signupForm.value.userData.birthday;
      this.order.reservation = this.checkOutDate;

      for (const date of this.checkOutDate) {
        this.selectedCar.reservation.push(date);
      }

      this.carService.updateCar(this.selectedCar);
      this.orderSerivce.addOrder(this.order);
      this.modalService.open(this.content, { centered: true, size: 'lg', windowClass: 'dark-modal' });
    }
  }

  closeModal() {
    this.modalService.dismissAll(this.content);
    this.router.navigate([''], { relativeTo: this.route });
  }


  closeModal2() {
    this.modalService.dismissAll(this.content2);
    this.router.navigate(['reserve']);
  }
}
