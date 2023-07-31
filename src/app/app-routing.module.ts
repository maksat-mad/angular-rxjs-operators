import { ThrottleTimeComponent } from './components/throttle-time/throttle-time.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DebounceTimeComponent } from './components/debounce-time/debounce-time.component';
import { MapOperatorComponent } from './components/map-operator/map-operator.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'throttleTime',
    component: ThrottleTimeComponent
  },
  {
    path: 'debounceTime',
    component: DebounceTimeComponent
  },
  {
    path: 'map',
    component: MapOperatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
