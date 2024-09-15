import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../../models/CourseDetails';
import { CartService } from '../../../shared/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent {
  @Input() course!: Course;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  addToCart(courseId: number): void {
    this.cartService.addtoCart(courseId).subscribe({
      next: () => {
        this.toastr.success('Course added to cart successfully!');
      },
      error: () => {
        this.toastr.error('Failed to add course to cart.');
      },
    });
  }
}
