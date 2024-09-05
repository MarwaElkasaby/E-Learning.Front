import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  registerUser(user: any) {
    return this.http
      .post('http://localhost:5062/Api/Account/register', user)
      .pipe(
        catchError((error) => {
          // Return error observable
          return throwError(() => error);
        })
      );
  }

  loginUser(user: any) {
    return this.http.post('http://localhost:5062/Api/Account/login', user).pipe(
      catchError((error) => {
        // Return error observable
        return throwError(() => error);
      })
    );
  }

  getInstructorInfo(id: number): Observable<any> {
    return this.http.get(
      `http://localhost:5062/api/User/Get-Instructor-Info/${id}`
    );
  }
}
