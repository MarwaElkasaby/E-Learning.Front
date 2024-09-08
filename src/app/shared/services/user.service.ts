import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:5062/api/User';
  constructor(private http: HttpClient) {} //service to make HTTP requests
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

  getInstructorInfo(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Get-Instructor-Info/${id}`).pipe(
      catchError((error) => {
        console.error('Error getting user profile', error);
        return throwError(() => error);
      })
    );
  }

  updateUserProfile(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/Edit-User-Profile`, formData).pipe(
      catchError((error) => {
        console.error('Error updating user profile', error);
        return throwError(() => error);
      })
    );
  }
}
