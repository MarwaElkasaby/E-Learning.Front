import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  isHeartFilled = true;
  toggleHeart() {
    this.isHeartFilled = !this.isHeartFilled;
  }
}
