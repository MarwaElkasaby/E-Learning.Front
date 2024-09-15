import { Component, inject, OnInit } from '@angular/core';
import { CourseDetailsHeaderComponent } from '../../Components/course-details/course-details-header/course-details-header.component';
import { SectionsListComponent } from '../../Components/course-details/sections-list/sections-list.component';
import { Course } from '../../models/CourseDetails';
import { CourseDetailsService } from '../../shared/services/course/course-details-service/course-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {  ReadCourseRatingDTO } from '../../models/Rating';
import { RatingService } from '../../shared/services/rating.service';
import { RatingCardComponent } from '../../Components/course-details/rating-card/rating-card.component';
import { AddToCartComponent } from '../../Components/course-details/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CourseDetailsHeaderComponent,
    SectionsListComponent,
    CurrencyPipe,
    RatingCardComponent,
    AddToCartComponent,
    CommonModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  ratings: ReadCourseRatingDTO[] = [];

  constructor(
    private courseDetailsService: CourseDetailsService,
    private ratingService: RatingService,
    private cartService: CartService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch course details
    this.courseDetailsService.getCourseDetails(courseId).subscribe({
      next: (course: any) => {
        // console.log('course', course);

        this.course = course;
      },
      error: () => {
        this.toastr.error('Failed to load course details.');
      },
    });

    // Fetch course ratings
    this.ratingService.getAllRatingsForCourse(courseId).subscribe({
      next: (ratings: ReadCourseRatingDTO[]) => {
        console.log('Ratings:', ratings); // Log the data to ensure it's an array
        this.ratings = ratings;
      },
      error: () => {
        this.toastr.error('Failed to load course ratings.');
      },
    });
  }

  addToCart(courseId: number) {
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
