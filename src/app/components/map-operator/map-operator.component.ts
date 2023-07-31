import { Component, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, concatMap, exhaustMap, map, mergeMap, switchMap, take, tap, zip } from 'rxjs';

type Durum = ['flat bread', 'meat', 'souse', 'tomato', 'cabbage'];

let flatBreadCounter = 0;
let meatCounter = 0;
let souseCounter = 0;
let tomatoCounter = 0;
let cabbageCounter = 0;

let customerId = 0;

interface Order {
  amount: number,
  customerId: number
}

interface Product {
  product: Durum,
  customerId: number
}

@Component({
  selector: 'app-map-operator',
  templateUrl: './map-operator.component.html',
})
export class MapOperatorComponent implements OnInit {
  durum$!: Observable<Durum>;
  delivery$: Observable<Product> | undefined;

  _order = new Subject<Order>();

  _flatBread = new Subject<'flat bread'>();
  _meat = new Subject<'meat'>();
  _souse = new Subject<'souse'>();
  _tomato = new Subject<'tomato'>();
  _cabbage = new Subject<'cabbage'>();

  ngOnInit() {
    // in zip, the order is preserved
    this.durum$ = zip(
      this._flatBread.pipe(
        map((value) => value + ` ${flatBreadCounter++}`),
        tap(console.log)
      ),
      this._meat.pipe(
        map((value) => value + ` ${meatCounter++}`),
        tap(console.log)
      ),
      this._souse.pipe(
        map((value) => value + ` ${souseCounter++}`),
        tap(console.log)
      ),
      this._tomato.pipe(
        map((value) => value + ` ${tomatoCounter++}`),
        tap(console.log)
      ),
      this._cabbage.pipe(
        map((value) => value + ` ${cabbageCounter++}`),
        tap(console.log)
      )
    ).pipe(tap((durum) => console.log('Enjoy: ', durum)));
    // Бұл жерде барлығы кезекпен жүреді
    // мысалы, meat-ты 10-рет басса, zip болғанда тек біріншісін алады
    // ал, combineLatest-та ең соңғысын алады, мысалы, meat сияқты
    // 10 болса, біріншісін емес, оныншысын алады

    // combineLatest combines latest value of each
    this.durum$ = combineLatest([
      this._flatBread.pipe(
        map((value) => value + ` ${flatBreadCounter++}`),
        tap(console.log)
      ),
      this._meat.pipe(
        map((value) => value + ` ${meatCounter++}`),
        tap(console.log)
      ),
      this._souse.pipe(
        map((value) => value + ` ${souseCounter++}`),
        tap(console.log)
      ),
      this._tomato.pipe(
        map((value) => value + ` ${tomatoCounter++}`),
        tap(console.log)
      ),
      this._cabbage.pipe(
        map((value) => value + ` ${cabbageCounter++}`),
        tap(console.log)
      ),
    ]).pipe(tap((durum) => console.log('Enjoy: ', durum)));

    this.delivery$ = this._order.pipe(
      tap((order: Order) => console.log('New order: ', order)),
      mergeMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map((durum) =>  ({ product: durum, customerId }))
        )
      ),
      tap((product) => console.log('Delivered product: ', product))
    );
    // mergeMap барлығын ала береді

    this.delivery$ = this._order.pipe(
      tap((order: Order) => console.log('New order: ', order)),
      switchMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map((durum) =>  ({ product: durum, customerId }))
        )
      ),
      tap((product) => console.log('Delivered product: ', product))
    );
    // switchMap-та ең соңғы запросты алып, қалғандарын өшіріп тастайды

    this.delivery$ = this._order.pipe(
      tap((order: Order) => console.log('New order: ', order)),
      concatMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map((durum) =>  ({ product: durum, customerId }))
        )
      ),
      tap((product) => console.log('Delivered product: ', product))
    );
    // concatMap кезекке қарайды

    this.delivery$ = this._order.pipe(
      tap((order: Order) => console.log('New order: ', order)),
      exhaustMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map((durum) =>  ({ product: durum, customerId }))
        )
      ),
      tap((product) => console.log('Delivered product: ', product))
    );
    // exhaustMap сол запрос болып жатса, қалғандарына қарамайды
  }

  dispatchOrder() {
    const amount = Math.floor(Math.random() * 3) + 1;
    ++customerId;
    this._order.next({ amount, customerId });
  }
}
