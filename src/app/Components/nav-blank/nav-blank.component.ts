import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OfferService } from '../../shared/services/offer.service';
import { Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { AnnouncementService } from '../../shared/services/announcement.service';
import { log } from 'console';
import { CartService } from '../../shared/services/cart.service';
import { response } from 'express';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, NgFor, FormsModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
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
  
  getCartNumer:any
  
  isauth:boolean=false;
  token: any;
  tokendata: any;
  userId!: number;
  username!: string;
  role!: string;
  isBrowser: boolean;
 endofsale!: Date;
  constructor(
    private _CategoryService: CategoryService,
    private _Router: Router,
    private _OfferService: OfferService,
    private userservice:UserService,
    private announcementservice:AnnouncementService,
    private cart:CartService,
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

        const endofsaledate = new Date(this.endofsale);

        this.countdown$ = this._OfferService.getCountdown(endofsaledate);
      }
    }, 2000);
  }

  isNavbarOpen = false;
  isDropdownOpen:any = {
    userDropdown: false,

    categoryDropdown: false
  };

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleDropdown(dropdown: string) {
    // Close all dropdowns if the clicked one is already open
    if (this.isDropdownOpen[dropdown]) {
      this.isDropdownOpen[dropdown] = false;
    } else {
      // Close all other dropdowns
      Object.keys(this.isDropdownOpen).forEach(key => this.isDropdownOpen[key] = false);
      this.isDropdownOpen[dropdown] = true;
    }
  }
  

  
  ngOnInit(): void {


    this.cart.getCartItemsById(this.userId).subscribe({
      next:(response) =>{
        this.cart.cartNumber.next(response.length)
        this.cart.cartNumber.subscribe(
          {
            next:(data)=>{
             
              this.getCartNumer=data
              console.log("da el acrt numberr  "+ this.getCartNumer)
            }
          }
        )
      }

    })
    this._CategoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(response);
      },
    });

    this.announcementservice.getAnnouncements().subscribe({
      next: (response:any) => {
        console.log(response);
        this.endofsale = response[0].endOfSale;
        console.log(this.endofsale);
        
      },
    });

   
    
    // this.cart.cartNumber.subscribe(
    //   {
    //     next:(data)=>{
         
    //       this.getCartNumer=data
    //       console.log("da el acrt numberr  "+ this.getCartNumer)
    //     }
    //   }
    // )

  }

  ////////search
  searchTerm: string = '';

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this._Router.navigate(['/searchResult', this.searchTerm]);
      this.searchTerm = '';
    }
  }

  isDropdownOpenUser=false
  toggleDropdownUser() {
    if (window.innerWidth < 992) {
      this.isDropdownOpenUser = !this.isDropdownOpenUser;
    }
  }

  logout() {
 this.userservice.logout().subscribe({

    next:(response)=>{
if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.isauth=false;
      this._Router.navigate(['/login']);
    }

  
}
  })
    }


}