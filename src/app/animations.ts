import { trigger, state, query, style, animate, transition, animateChild, group } from '@angular/animations';

export const Animations = [
  trigger('showHide', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-120%)'
      }),
      animate('1s', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
    ]),
    transition(':leave', [
      animate('1s', style({
        opacity: 0,
        transform: 'translateX(-120%)'
      }))
    ])
  ]),

  trigger('showCar', [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate('1s', style({
        opacity: 1,
      })),
    ]),
    transition(':leave', [
      animate('0s', style({
        opacity: 0,
      }))
    ])
  ]),

  trigger('routeAnimations', [
    transition('* => home, * => carsanimation, * => contact, * => admin, adminorders<=>admincars',  [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter',  [
        style({ left: '-100%'})
      ]),
      query(':leave',  animateChild()),
      group([
        query(':leave',  [
          animate('800ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('800ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]),

  trigger('routeAnimations2', [
    transition('orders<=>admincars',  [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter',  [
        style({ left: '-100%'})
      ]),
      query(':leave',  animateChild()),
      group([
        query(':leave',  [
          animate('800ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('800ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]),
];
