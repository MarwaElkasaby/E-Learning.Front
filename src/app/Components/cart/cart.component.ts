import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../shared/services/payment.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CourseDetailsService } from '../../shared/services/course/course-details-service/course-details.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  token: any;
  tokendata: any;
  cartno: any;

  constructor(

    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private paymentservice: PaymentService,
    private wishListService: WishlistService
     private courseService:CourseDetailsService,

  ) {}


courses:any[]=[];
total:any;
userId:any;

getCartTotal(){
  
  this._CartService.getCartTotalById(this.userId).subscribe(
    {
      next:(response)=>{
        console.log(response);
        this.total = response.totalPrice;
        console.log(this.total);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItemFromCart(itemId: any) {
    console.log(itemId);
    this._CartService.removeCartItemById(this.userId, itemId).subscribe({
      next: (response) => {
        console.log(response);
        this.courses = response;
        this.getCartTotal();

        this._CartService.getCartItemsById(this.userId).subscribe({
          next: (response) => {
            this.cartno = response.length;
            console.log('da el responssss' + this.cartno);

            this._CartService.cartNumber.next(this.cartno);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(this.courses);
  }

  addToWishList(CourseId: number): void {
    this._CartService.removeCartItemById(this.userId,CourseId).subscribe({
      next: (response: any) => {
        this.courses = response;
        this.getCartTotal();
        
        this._CartService.getCartItemsById(this.userId).subscribe({
          next: (response) => {
            this.cartno = response.length;
            console.log('da el responssss' + this.cartno);

            this._CartService.cartNumber.next(this.cartno);
          },
        });

        console.log("deleted from cart")
      },
      error: (err) => {
        console.log(err);
      },
    })
    this.wishListService.addToWishList(CourseId).subscribe({
      next: (response: any) => {
        console.log("moved to wishlist")
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        //shayl kol eli fe el url
        this.userId = params.get('id');
      },
    });

    this._CartService.getCartItemsById(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        this.courses = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
}

EnrollFreeCourses(){
    this.courseService.enrollFreeCourse().subscribe({
      next: (response) =>{
        window.location.href = response.url;
        console.log(response);
        
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }
}




    this.getCartTotal();

    console.log(this.total);
  }

  // CHECKOUT
  selectedPaymentMethod: string = '';
  mobileNumber: string = '';

  checkOut(method: string) {
    if (method == 'card') {
      this.paymentservice.PayWithOnlineCard().subscribe({
        next: (response) => {
          console.log(response);
          window.location.href = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    if (method == 'wallet') {
      this.paymentservice.PayWithMobileWallet(this.mobileNumber).subscribe({
        next: (response) => {
          console.log(response);
          window.location.href = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
