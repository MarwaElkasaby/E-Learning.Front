import { Component } from '@angular/core';
import { CourseCardComponent } from "../course-card/course-card.component";

@Component({
  selector: 'app-user-courses',
  standalone: true,
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css',
  imports: [CourseCardComponent],
})
export class UserCoursesComponent {
  
}
