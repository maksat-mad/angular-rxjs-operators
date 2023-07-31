import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, throttleTime} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-throttle-time',
  templateUrl: './throttle-time.component.html'
})
export class ThrottleTimeComponent implements OnInit, OnDestroy  {
  subscription$: Subscription | undefined;

  ngOnInit() {
    const observable = interval(1000);
    this.subscription$ = observable.pipe(
      map((value) => 'Number: ' + value),
      throttleTime(1900)
      // Emits a value from the source Observable,
      // then ignores subsequent source values for duration milliseconds,
      // then repeats this process.
    )
    .subscribe({
      next: (value) => {
        console.log(value);
      }
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
