import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule ,NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  emailerrormessage: string ='';
  passworderrormessage: string ='';
  constructor(private userservice:UserService) { }
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
this.userservice.loginUser(form.value).subscribe({
  next: (response: any) => {
    console.log('Login successful', response);
    localStorage.setItem('token', response.token);
  },
  error: (error) => {
    console.log('Error in login', error);

  }
});

}


}
