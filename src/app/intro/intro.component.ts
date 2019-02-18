import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Animations } from '../animations';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [Animations]
})
export class IntroComponent implements AfterViewInit {
  @ViewChild('target') public target: ElementRef;
  loading = false;

  constructor() {}


  ngAfterViewInit() {
    this.loading = true;
  }

  scroll() {
    this.target.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'});

  }


}
