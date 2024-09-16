import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
baseurl:string ='http://localhost:5062'
  constructor(private _HttpClient:HttpClient) { }

  checkoutwithcard() :Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/payment/OnlineCardIFrame`);
  }

}
