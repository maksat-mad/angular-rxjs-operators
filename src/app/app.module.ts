import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThrottleTimeComponent } from './components/throttle-time/throttle-time.component';
import { HomeComponent } from './components/home/home.component';
import { DebounceTimeComponent } from './components/debounce-time/debounce-time.component';
import { MapOperatorComponent } from './components/map-operator/map-operator.component';

@NgModule({
  declarations: [
    AppComponent,
    ThrottleTimeComponent,
    HomeComponent,
    DebounceTimeComponent,
    MapOperatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
