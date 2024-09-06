import { Component, Input } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../../../models/CourseDetails';

@Component({
  selector: 'app-course-details-header',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './course-details-header.component.html',
  styleUrl: './course-details-header.component.css',
})
export class CourseDetailsHeaderComponent {
  @Input({ required: true }) course!: Course;
}
