import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [CommonModule,RouterLink , FormsModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.css'
})
export class NavAuthComponent  {

constructor(private _CategoryService:CategoryService,private _Router:Router){
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

 
isNavbarOpen = false;
isDropdownOpen:any = {
  categoryDropdown: false
};

toggleNavbar() {
  this.isNavbarOpen = !this.isNavbarOpen;
}

toggleDropdown(dropdown: string) {
  this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
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

