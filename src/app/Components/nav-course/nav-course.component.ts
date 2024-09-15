import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-course',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-course.component.html',
  styleUrl: './nav-course.component.css',
})
export class NavCourseComponent {
  @Input() courseId!: number;
  @Input() courseTitle!: string;
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  copyShareLink() {
    const courseLink = `http://localhost:4200/course/${this.courseId}`;
    navigator.clipboard.writeText(courseLink).then(() => {
      alert('Course link copied to clipboard!');
    });
  }
}
