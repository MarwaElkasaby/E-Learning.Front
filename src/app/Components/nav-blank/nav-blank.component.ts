import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [ CommonModule,RouterLink, NgFor, FormsModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {
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
  
  isauth:boolean=false;
  token: any;
  tokendata: any;
  userId !: number;
  username !: string;
  role !: string;

  constructor (private _CategoryService:CategoryService, private _Router:Router,private userservice :UserService){
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
     if (this.token) {
       this.isauth=true;
       this.tokendata = JSON.parse(atob(this.token.split('.')[1]));

       // Extracting user ID, username, and role
       this.userId = this.tokendata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
       this.username = this.tokendata['sub']; // Username claim
       this.role = this.tokendata['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Role claim
       console.log(this.userId);
     }
   }else{
     this.isauth=false;
   }


  }

categories:any[]=[];
ngOnInit(): void {
  this._CategoryService.getCategories().subscribe({
    next: (response)=>{
      this.categories=response;
      console.log(response);


    }
  })
}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  ////////search
  searchTerm: string = '';


  onSearch(): void {
    if (this.searchTerm.trim()) {
      this._Router.navigate(['/searchResult', this.searchTerm]);
      this.searchTerm='';
    }
  }
}
