import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

import {  RouterLink } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { OfferService } from '../../shared/services/offer.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [CommonModule,RouterLink , FormsModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.css'
})
export class NavAuthComponent  {
 
  isauth:boolean=false;
  token: any;
  tokendata: any;
  userId!: number;
  username!: string;
  role!: string;
  isBrowser: boolean;

  constructor(
    private _CategoryService: CategoryService,
    private _Router: Router,
    private _OfferService: OfferService,
    private userservice:UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Set the value

    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }

    if (this.token) {
      this.tokendata = JSON.parse(atob(this.token.split('.')[1]));

      // Extracting user ID, username, and role
      this.userId =
        this.tokendata[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      this.username = this.tokendata['sub']; // Username claim
      this.role =
        this.tokendata[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]; // Role claim
      console.log(this.userId);
    }

  }

  categories: any[] = [];

  // timer offer
  countdown$!: Observable<string>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isBrowser) {
        // Ensure countdown only runs in the browser
        const offerEndTime = new Date();
        offerEndTime.setHours(offerEndTime.getHours() + 24); // Set offer end time 24 hours from now
        this.countdown$ = this._OfferService.getCountdown(offerEndTime);
      }
    }, 2000);
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

  ngOnInit(): void {
    this._CategoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(response);
      },
    });

  }

  ////////search
  searchTerm: string = '';

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this._Router.navigate(['/searchResult', this.searchTerm]);
      this.searchTerm = '';
    }
  }
}

