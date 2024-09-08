import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [ CommonModule,RouterLink, NgFor, FormsModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {

  constructor (private _CategoryService:CategoryService, private _Router:Router){}

categories:any[]=[];
ngOnInit(): void {
  this._CategoryService.getAllCategories().subscribe({
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
