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
