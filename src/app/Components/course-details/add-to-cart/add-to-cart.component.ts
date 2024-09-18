import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../../models/CourseDetails';
import { CartService } from '../../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent implements OnInit{
  @Input() course!: Course;

  token: any;
  tokendata: any;
  userId!: number;
  cartno: any;
  isenrolled: boolean = false;

  constructor(
    private httpclient:HttpClient,
    private cartService: CartService,
    private toastr: ToastrService,
    private wishListService: WishlistService
  ) {
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

      console.log(this.userId);
    }
  }
  ngOnInit(): void {
   this.httpclient.get(`http://localhost:5062/api/Course/IsEnrolled/${this.course.id}`).subscribe((data: any) => {
if (data.isEnrolled) {
  this.isenrolled = true;
  console.log(this.isenrolled);
  
}else{
  this.isenrolled = false;
  console.log(this.isenrolled);
}
   });

  }

  addToCart(courseId: number): void {
    this.cartService.addtoCart(courseId).subscribe({
      next: (response: any) => {
        this.toastr.success('Course added to cart successfully!');
        console.log(response);
        this.cartService.getCartItemsById(this.userId).subscribe({
          next: (response) => {
            this.cartno = response.length;
            this.cartService.cartNumber.next(this.cartno);
          },
        });
      },
      error: () => {
        this.toastr.error('Course Already Exists');
      },
    });
  }

  addToWishList(CourseId: number): void {
    this.wishListService.addToWishList(CourseId).subscribe({
      next: (response: any) => {
        this.toastr.success('Course added to wishlist successfully!');
      },
      error: () => {
        this.toastr.error('Course Already Exists');
      },
    });
  }
}
