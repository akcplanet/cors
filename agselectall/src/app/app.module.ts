import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import "ag-grid-enterprise";
import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
       AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
