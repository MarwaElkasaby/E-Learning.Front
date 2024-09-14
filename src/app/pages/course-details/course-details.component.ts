import { Component, inject, OnInit } from '@angular/core';
import { CourseDetailsHeaderComponent } from '../../Components/course-details/course-details-header/course-details-header.component';
import { SectionsListComponent } from '../../Components/course-details/sections-list/sections-list.component';
import { Course } from '../../models/CourseDetails';
import { CourseDetailsService } from '../../shared/services/course/course-details-service/course-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CourseDetailsHeaderComponent, SectionsListComponent,CurrencyPipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  courseDetailsSrv = inject(CourseDetailsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // Inject CartService and ToastrService
  cartService = inject(CartService);
  toastr = inject(ToastrService);

  courseId: number | undefined;

  ngOnInit(): void {
    this.courseId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getCourseDetails(this.courseId);
  }

  // Fetch course details
  getCourseDetails(id: number) {
    this.courseDetailsSrv.getCourseDetails(id).subscribe({
      next: (res) => {
        this.course = res;
      },
      error: () => {
        this.router.navigate(['not-found']);
      },
    });
  }

  // Add to cart function
  addToCart(courseId: number) {
    this.cartService.addtoCart(courseId).subscribe({
      next: () => {
        this.toastr.success('Course added to cart successfully!');
      },
      error: (error) => {
        this.toastr.error('Failed to add course to cart.');
        console.error('Error adding course to cart:', error);
      }
    });
  }
}
