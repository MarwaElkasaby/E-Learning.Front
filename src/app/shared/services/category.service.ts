import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }
  baseURL='http://localhost:5062';

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/Category`)
  }

}
