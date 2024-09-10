import { Component } from '@angular/core';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  constructor(private _WishlistService: WishlistService, private _ActivatedRoute:ActivatedRoute) {
  }
  courses: any[] = [];
  userId: any;


  removeItemFromWishlist(itemId: any) {
    console.log(itemId);
    this._WishlistService.removeWishListItemById(this.userId, itemId).subscribe({
      next: (response) => {
        console.log(response);
        this.courses = response
      },
      error: (err) => {
        console.log(err);
      }
    })
    console.log(this.courses);
  }


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        //shayl kol eli fe el url
        this.userId=params.get('userId')
  
        
      }
    })
  

    
    this._WishlistService.getWishListItemsById(this.userId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.courses = response;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )

  }


}
