import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpasswordtoken',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgetpasswordtoken.component.html',
  styleUrl: './forgetpasswordtoken.component.css'
})
export class ForgetpasswordtokenComponent implements OnInit {
confirmationmessage: string = '';
passwordErrors: string[] = [];
passwordMismatch = false;
newpasswordform!:{
  password: string ;
  confirmPassword: string;
  email: string;  
  token: string;
};

constructor(private route :ActivatedRoute,private userservice:UserService,private router:Router,private toaster:ToastrService) { 
  this.route.queryParams.subscribe(params => {
    if(params['email'] && params['token']){
      this.newpasswordform = {
        email: params['email'],
        token:  decodeURIComponent(params['token']),
        password: '',
        confirmPassword: ''
      }
      console.log(this.newpasswordform.token);
      
    }else{
      this.router.navigate(['/forget-password']);
    }
  }
  );

}
  ngOnInit(): void {



  }
  onsubmit(form: NgForm) {
    this.passwordErrors = [];
    this.confirmationmessage = '';
    this.userservice.resetpassword(this.newpasswordform).subscribe({
      next: (response: any) => {
        console.log('Password reset successful', response);
        this.toaster.success('Password reset successful');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
    
      },
      error: (error) => {
        console.log('Error in password reset', error);
   
        if (error.error) {//this is for password confirmation
      
if (error.error.errors) {
  console.log(error.error.errors.confirmPassword[0]);//cant read problem
          
  this.confirmationmessage = error.error.errors.confirmPassword[0];
}

if (error.error.PasswordRequiresDigit) {
  this.passwordErrors.push(error.error.PasswordRequiresDigit[0]);
}
if (error.error.PasswordRequiresNonAlphanumeric) {
this.passwordErrors.push(error.error.PasswordRequiresNonAlphanumeric[0]);
}
if (error.error.PasswordRequiresUpper) {
this.passwordErrors.push(error.error.PasswordRequiresUpper[0]);
}

if (error.error.InvalidToken) {
  alert('Invalid token');
  this.router.navigate(['/forget-password']);
}
        }
        
      }
    });
    }
}
