import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class HistoryOrderModule {

  public orderId: number;
  public carId: number;
  public name: string;
  public surname: string;
  public email: string;
  public birthday: NgbDate;
  public reservation: NgbDate[];
  public state: string;

  constructor(orderId: number, carId: number, name: string,
    surname: string, email: string,
    birthday: NgbDate, reservation: NgbDate[], state: string) {
    this.orderId = orderId;
    this.carId = carId;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.birthday = birthday;
    this.reservation = reservation;
    this.state = state;
  }
 }

