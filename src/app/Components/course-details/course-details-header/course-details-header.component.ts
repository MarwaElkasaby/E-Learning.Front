import { Component, Input } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../../../models/CourseDetails';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-details-header',
  standalone: true,
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './course-details-header.component.html',
  styleUrl: './course-details-header.component.css',
})
export class CourseDetailsHeaderComponent {
  @Input() course!: Course;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Add to Cart Function
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
