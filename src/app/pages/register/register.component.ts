import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  emailerrormessage: string ='';
  passworderrormessage: string ='';
  confirmPassworderrormessage: string ='';
  passworderrormessagearray: string[] = [];

registerform!:{
  fName: string,
  LName: string,
  email: string,
  password: string,
  confirmPassword: string,
  phone : number,
  userRole: number
}

constructor(private userservice:UserService) {

 }

ngOnInit(): void {
  this.registerform = {
    fName: '',
    LName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: 0,
    userRole: 0

  }
}

  // Helper method to clear all error messages
  clearErrorMessages() {
    this.emailerrormessage = '';
    this.passworderrormessage = '';
    this.confirmPassworderrormessage = '';
    this.passworderrormessagearray = [];
  }

onSubmit(form: NgForm) {
  this.userservice.registerUser(form.value).subscribe({
    next: (response) => {
      console.log('Registration successful', response);
    },
    error: (error) => {
      console.log('Error in registration', error);


        if (error.error && error.error.errors) {

      //password confirm error done
      if (error.error.errors.ConfirmPassword ) {
  this.clearErrorMessages();
        this.confirmPassworderrormessage = error.error.errors.ConfirmPassword;
      console.log(error.error.errors.ConfirmPassword[0]);

      }
        }


      if (error.error.detail) {
        console.log(error.error.detail);


        if (error.error.detail.includes('Username')) {
          this.clearErrorMessages();
          this.emailerrormessage = error.error.detail;

        }

        if (error.error.detail.includes('Passwords')) {
          this.clearErrorMessages();
          this.passworderrormessage = error.error.detail;
        }

      }
    }
  });


}




}

