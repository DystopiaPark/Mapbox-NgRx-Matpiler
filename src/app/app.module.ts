import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { mapReducer } from './reducers/map.reducer';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({ map: mapReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
