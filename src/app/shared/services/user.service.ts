import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError ,tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  registerUser(user: any) {
    return this.http
      .post('http://localhost:5062/Api/Account/register', user)
      .pipe(
        tap((response:any) => {
          // Assuming the response contains the token in a property named 'token'
          const token = response.token;
          if (token) {
            localStorage.setItem('token', token);  // Store token in localStorage
                 // Set the expiration timer
            this.setTokenExpiration(token);
          }
        }),
        catchError((error) => {
          return throwError(() => error);  // Handle error
        })
      );
  }

  setTokenExpiration(token: string) {
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const tokenExpiration = new Date(tokenData.exp * 1000);

    
    const now = new Date();
    const expiresIn = tokenExpiration.getTime() - now.getTime();
    setTimeout(() => {
      localStorage.removeItem('token');
    }, expiresIn);
  }

  loginUser(user: any) {
    return this.http.post('http://localhost:5062/Api/Account/login', user).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          this.setTokenExpiration(token);
        }
      }
      ),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  forgetpassword(form: { email: string }) {
    return this.http
      .post('http://localhost:5062/Api/Account/forget-password', form)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  resetpassword(form: { email: string; token: string; password: string, confirmPassword: string }) {
    return this.http
      .post('http://localhost:5062/Api/Account/reset-password', form)
      .pipe(
        catchError((error) => {
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


