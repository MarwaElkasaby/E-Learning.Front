import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL = 'http://localhost:5062';

  getAllCourses(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/Course/GetAllCourses`);
  }

  submitCourse(data: any): Observable<any> {
    return this._HttpClient.post<any>(
      `${this.baseURL}/Api/course/uploadCourse`,
      data
    );
  }
}
