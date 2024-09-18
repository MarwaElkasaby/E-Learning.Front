import { Component, Input } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../../../models/CourseDetails';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-details-header',
  standalone: true,
  imports: [NgbRatingModule, CommonModule,RouterModule],
  templateUrl: './course-details-header.component.html',
  styleUrl: './course-details-header.component.css',
})
export class CourseDetailsHeaderComponent {
  @Input() course!: Course;
  @Input()isenrolled: boolean = false;
  @Input() isauth: boolean = false;

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
