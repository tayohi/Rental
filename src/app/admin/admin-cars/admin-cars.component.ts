import { Component, OnInit, ViewChild } from '@angular/core';
import { CarModule } from 'src/app/car.module';
import { Subscription } from 'rxjs';
import { CarService } from 'src/app/car.service';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.scss']
})
export class AdminCarsComponent implements OnInit {
  signupForm = new FormGroup({
    type: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
    engine: new FormControl(null, Validators.required),
    version: new FormControl(null, Validators.required),
    equipment: new FormControl(null, Validators.required),
    imagePath: new FormControl(null, Validators.required)
  });

  @ViewChild('content') content;
  cars: CarModule[];
  carsToDelete: CarModule[] = [];
  subscription: Subscription;

  constructor(public modalConfig: NgbModalConfig, private modalService: NgbModal,
    private carService: CarService) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
  }


  ngOnInit() {
    this.carService.setCarBase();
    this.subscription = this.carService.carChanged
      .subscribe(
        (cars: CarModule[]) => {
          this.cars = cars;
        }
      );
    this.cars = this.carService.getCars();
  }


  addCar() {

    this.modalService.open(this.content, { centered: true, size: 'lg', windowClass: 'dark-modal' });
  }

  closeModal() {
    this.modalService.dismissAll(this.content);
  }


  onSubmit() {

    let maxId = (Math.max(...this.carService.carBase.map(f => f.id))) + 1;
    if (maxId < 1 ) {
      maxId = 1;
    }

    const car: CarModule = {
      id: maxId,
      type: this.signupForm.get('type').value,
      model: this.signupForm.get('model').value,
      engine: this.signupForm.get('engine').value,
      description: this.signupForm.get('version').value,
      comments: this.signupForm.get('equipment').value,
      imgPath: this.signupForm.get('imagePath').value,
      reservation: []
    };
    this.carService.addCar(car);
    this.signupForm.reset();
    this.modalService.dismissAll(this.content);
  }

  deletedCars(state: boolean, car: CarModule) {
    if (state === true ) {
      this.carsToDelete.push(car);
    } else {
      this.carsToDelete = this.carsToDelete.filter(e => e.id !== car.id);
    }

    console.log(this.carsToDelete);

  }

  deleteCars() {
    for ( const x of this.carsToDelete) {
      this.carService.deleteCar(x);
    }
    this.carsToDelete = [];
  }
}
