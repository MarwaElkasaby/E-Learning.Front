import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseDetailsService {
  constructor(private httpClient: HttpClient) {}

  getCourseDetails(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:5062/api/Course`, {
      params: new HttpParams().set('id', id),
    });
  }

  getCourseContent(id: number): Observable<any> {
    return this.httpClient.get(
      `http://localhost:5062/api/course/content/${id}`,
      {
        params: new HttpParams().set('userId', 3),
      }
    );
  }
}
