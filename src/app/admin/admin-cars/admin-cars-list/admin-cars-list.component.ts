import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CarModule } from 'src/app/car.module';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/car.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-admin-cars-list',
  templateUrl: './admin-cars-list.component.html',
  styleUrls: ['./admin-cars-list.component.scss']
})
export class AdminCarsListComponent implements OnInit {


  @Input() availableCar: CarModule;
  @Output() deleteCar: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('content') content;
  selected = true;
  error = false;

  signupForm = new FormGroup({
    model: new FormControl(null, Validators.required),
    engine: new FormControl(null, Validators.required),
    version: new FormControl(null, Validators.required),
    equipment: new FormControl(null, Validators.required),
  });


  constructor(public modalConfig: NgbModalConfig, private modalService: NgbModal,
    private carService: CarService) { }

  ngOnInit() {
  }

  selectCar() {
    if (this.availableCar.reservation.length === 0) {
      this.selected = !this.selected;
      if (!this.selected) {
        this.deleteCar.emit(true);
      } else {
        this.deleteCar.emit(false);
      }

    } else {
      this.error = true;
    }

  }

  editCar() {
    this.modalService.open(this.content, { centered: true, size: 'lg', windowClass: 'dark-modal' });
    this.signupForm.patchValue({
      model: this.availableCar.model,
      engine: this.availableCar.engine,
      version: this.availableCar.description,
      equipment: this.availableCar.comments,
    });


  }

  closeModal() {
    this.modalService.dismissAll(this.content);
  }

  onSubmit() {

    const car: CarModule = {
      id: this.availableCar.id,
      type: this.availableCar.type,
      model: this.signupForm.get('model').value,
      engine: this.signupForm.get('engine').value,
      description: this.signupForm.get('version').value,
      comments: this.signupForm.get('equipment').value,
      reservation: this.availableCar.reservation
    };
    this.carService.updateCar(car);
    this.signupForm.reset();
    this.modalService.dismissAll(this.content);

  }
}
