import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  isloading: boolean = false; 
  emailerrormessage: string ='';
  passworderrormessage: string ='';
  confirmPassworderrormessage: string ='';

  phonenumbererrormessage: string ='';

registerform!:{
  fName: string,
  LName: string,
  email: string,
  password: string,
  confirmPassword: string,
  phone : number,
  userRole: number
}

constructor(private userservice:UserService,private toastr: ToastrService,private router:Router) {

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
  
  }

onSubmit(form: NgForm) {

if (this.registerform.password !== this.registerform.confirmPassword) {
  this.confirmPassworderrormessage = 'Passwords do not match';
  return;
}

if(form.valid){
  this.isloading = true;
  this.userservice.registerUser(form.value).subscribe({
    next: (response:any) => {
      this.isloading = false;
      console.log('Registration successful', response);
      this.toastr.success('Registration successful');
    
setTimeout(() => {
  this.router.navigate(['/']);
}, 5000);

    },
    error: (error) => {
      console.log('Error in registration', error);


        if (error.error && error.error.errors) {

      //password confirm error done
      if (error.error.errors.ConfirmPassword ) {
  this.clearErrorMessages();
        this.confirmPassworderrormessage = error.error.errors.ConfirmPassword;
      console.log(error.error.errors.ConfirmPassword[0]);
      this.toastr.error('Password does not match');

      }
      if (error.error.errors.Phone) {
        this.clearErrorMessages();
        this.phonenumbererrormessage = error.error.errors.Phone;
        console.log(error.error.errors.Phone[0]);
        this.toastr.error('Phone number is required');
        
      }
        }


      if (error.error.detail) {
        console.log(error.error.detail);


        if (error.error.detail.includes('Username')) {
          this.clearErrorMessages();
          this.emailerrormessage = error.error.detail;
          this.toastr.error('Email already exists');

        }

        if (error.error.detail.includes('Passwords')) {
          this.clearErrorMessages();
          this.passworderrormessage = error.error.detail;

        }

      }
    }
  });
}else{
  this.toastr.error('Please fill the form correctly');
}




}

googleLogin(){
  window.location.href = 'http://localhost:5062/api/account/signin-google';
}


}

