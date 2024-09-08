import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule ,NgForm} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  emailerrormessage: string ='';
  passworderrormessage: string ='';
  constructor(private userservice:UserService ,private toaster:ToastrService ,private router:Router) { }
  ngOnInit(): void {
    this.loginform = {
      email: '',
      password: ''
    }
  }

loginform!:{
  email: string,
  password: string
}

onSubmit(form: NgForm) {


if(form.valid){
  this.userservice.loginUser(form.value).subscribe({
    next: (response: any) => {
      console.log('Login successful', response);
      this.toaster.success('Login successful');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 4000);

  
    },
    error: (error) => {
      console.log('Error in login', error);
      if (error.error) {
        this.emailerrormessage = error.error.detail;
        this.toaster.error(error.error.detail);
      }
  
    }
  });
  
}
}


}
