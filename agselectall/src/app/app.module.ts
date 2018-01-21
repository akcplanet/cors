import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import "ag-grid-enterprise";
import { AgGridModule } from "ag-grid-angular";
import {HeaderComponent} from "./header.component";
import { MessageService } from "./webpromise.service";
import {JsonpModule} from '@angular/http';
import { FilterPipe } from './filler.pipe'; 



@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      FilterPipe
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      HttpModule,
       AgGridModule.withComponents([HeaderComponent]),
       JsonpModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
