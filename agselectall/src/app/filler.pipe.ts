import { Pipe, PipeTransform } from '@angular/core';
import { MessageService } from "./webpromise.service";
import {Observable} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import {Component, OnInit, EventEmitter, Input, Output  } from "@angular/core";
@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    @Output() onSuggest: EventEmitter<any> = new EventEmitter();

    private service;
    private id = 100;
    constructor(_http: HttpClient, id: string) {
        this.service = _http.get('http://localhost:8080/aggrid/address?id=' + id);
        console.log('service', this.service);
    }

    transform(): number {
        this.service.subscribe(res => { this.service = res });
        console.log('id', this.id);
        this.onSuggest.emit(this.service);


        console.log('valu', this.service);

        return this.id;
    }
}