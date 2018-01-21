import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Address } from './address';
import {Observable} from 'rxjs/Rx';
import {Jsonp} from '@angular/http'; 
import 'rxjs/add/operator/map'; 
@Injectable()
 export class MessageService {

    constructor(private http: HttpClient,private _jsonp: Jsonp) {
    }

     getADD(id: string) {
        console.log(id) ; 
        return  this.http.get('http://localhost:8080/aggrid/address?id=' + id);
    }


    josnpADD(id: string) {
        console.log(id);
        let url = 'http://localhost:8080/aggrid/address?id=' + 101 + '&callback=JSONP_CALLBACK';
        return this._jsonp.request(url).map(res => {
            console.log(res)

            return res.json().results.map(item => {
                console.log(item);
            });
        });
    }

    }


