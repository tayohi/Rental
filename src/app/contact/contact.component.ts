import { Component, OnInit, ViewChild } from '@angular/core';
import { Animations } from '../animations';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [Animations]
})
export class ContactComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  @ViewChild('content') content;


  contactForm = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor( public modalConfig: NgbModalConfig, private modalService: NgbModal,
    private router: Router, private route: ActivatedRoute) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
   }



  ngOnInit() {
  }



  onSubmit() {


    this.contactForm.name = this.signupForm.value.userData.name;
    this.contactForm.surname = this.signupForm.value.userData.surname;
    this.contactForm.email = this.signupForm.value.userData.email;
    this.contactForm.phone = this.signupForm.value.userData.phone;
    this.contactForm.message = this.signupForm.value.userData.message;
    console.log(this.contactForm);

    this.modalService.open(this.content, { centered: true, size: 'lg', windowClass: 'dark-modal' });

  }

  closeModal() {
    this.modalService.dismissAll(this.content);
    this.router.navigate([''], { relativeTo: this.route });
  }




}
