import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


export class CarModule {

  public id: number;
  public type: string;
  public model: string;
  public engine: string;
  public description: string;
  public comments: string;
  public reservation: NgbDate[];

  constructor(id: number, type: string, model: string,
    engine: string, description: string,
    comments: string, reservation: NgbDate[]) {
    this.id = id;
    this.type = type;
    this.model = model;
    this.engine = engine;
    this.description = description;
    this.comments = comments;
    this.reservation = reservation;
  }
}
