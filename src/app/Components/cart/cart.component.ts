import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {
constructor(private _CartService:CartService, private _ActivatedRoute:ActivatedRoute)
{
}
courses:any[]=[];
total:any;
userId:any;

getCartTotal(){
  
  this._CartService.getCartTotalById(this.userId).subscribe(
    {
      

      next:(response)=>{
        console.log(response);
        this.total=response.totalPrice;
        console.log(this.total)
      },
      error: (err) => {
        console.log(err);
      }
    }
  )
}

removeItemFromCart(itemId:any){
  console.log(itemId);
this._CartService.removeCartItemById(this.userId, itemId).subscribe({
next:(response)=>{
  console.log(response);
  this.courses=response
  this.getCartTotal();
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
      this.userId=params.get('id')

      
    }
  })


  this._CartService.getCartItemsById(this.userId).subscribe(
    {
      next:(response)=>{
        console.log(response);
        this.courses=response;
      },
      error: (err) => {
        console.log(err);
      }
    }
  )

this.getCartTotal();

console.log(this.total)
}

}





