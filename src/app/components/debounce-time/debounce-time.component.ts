import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html'
})
export class DebounceTimeComponent implements OnInit, OnDestroy {
  ngDestroy$ = new Subject();

  ngOnInit() {
    const input = document.querySelector('input') as HTMLInputElement;

    // Throttle time = can limit the number of clicks so only 1 goes through every second (prevents button spamming)

    // Debounce time = can add a delay before each request goes through 
    // (you press the button then nothing happens for 1 seconds, then your request goes through)
    
    const observable = fromEvent(input, 'input');
    observable.pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.ngDestroy$)
    )
    .subscribe({
      next: (value) => {
        console.log(value);
      }
    });
  }

  ngOnDestroy() {
    this.ngDestroy$.next('');
    this.ngDestroy$.complete();
  }
}
