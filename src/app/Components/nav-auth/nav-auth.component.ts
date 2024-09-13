import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.css'
})
export class NavAuthComponent  {
  token: any;
  isauth:boolean=false;
  constructor(private userservice :UserService) {
    if (typeof window !== 'undefined') {
       this.token = localStorage.getItem('token');
      if (this.token) {
        this.isauth=true;
      }
    }else{
      this.isauth=false;
    }
   }

signout() {
if (typeof window != 'undefined') {
  localStorage.removeItem('token');
  this.userservice.logout().subscribe({
    next: (response)=>{
      console.log(response);
      this.isauth=false;
    } , 
    error: (err)=>{
      console.log(err);
    }
  })
}
}





}
