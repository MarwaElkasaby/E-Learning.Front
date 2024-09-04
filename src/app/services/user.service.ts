import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
emailerrormessage: string ='';
passworderrormessage: string ='';
passworderrormessagearray: string[] = [];

  constructor(private http:HttpClient) { }
  registerUser(user: any) {
    return this.http.post('http://localhost:5062/Api/Account/register', user).pipe(
      catchError((error) => {
        // Handle error here and return as observable

        
        
        if (error.error.detail && error.error.detail.includes('Email')) {
          this.emailerrormessage = error.error.detail;
        }
        if (error.error.ConfirmPassword) {
          this.passworderrormessagearray = error.error.ConfirmPassword;
        }
        // Return error observable
        return throwError(() => error);
      })
    );
  }
}