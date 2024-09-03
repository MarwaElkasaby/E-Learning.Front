import { Component } from '@angular/core';
import { NavCourseComponent } from "../nav-course/nav-course.component";
import { CourseContentComponent } from "../course-content/course-content.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-course-layout',
  standalone: true,
  imports: [NavCourseComponent, CourseContentComponent, FooterComponent],
  templateUrl: './course-layout.component.html',
  styleUrl: './course-layout.component.css'
})
export class CourseLayoutComponent {

}
