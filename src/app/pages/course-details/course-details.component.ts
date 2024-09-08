import { Component, inject, OnInit } from '@angular/core';
import { CourseDetailsHeaderComponent } from '../../Components/course-details/course-details-header/course-details-header.component';
import { SectionsListComponent } from '../../Components/course-details/sections-list/sections-list.component';
import { Course } from '../../models/CourseDetails';
import { CourseDetailsService } from '../../shared/services/course/course-details-service/course-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CourseDetailsHeaderComponent, SectionsListComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  courseDetailsSrv = inject(CourseDetailsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
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

  courseId: number | undefined;
  ngOnInit(): void {
    this.courseId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getCourseDetails(this.courseId);
  }
}
