import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-paymentapprove',
  standalone: true,
  imports: [],
  templateUrl: './paymentapprove.component.html',
  styleUrl: './paymentapprove.component.css'
})
export class PaymentapproveComponent {
  message:string = ''
constructor(private activatedroute:ActivatedRoute ){
  this.activatedroute.queryParams.subscribe(params =>{
    if (params['success']) {
      this.message = params['success'];
    }
  })


}
}
