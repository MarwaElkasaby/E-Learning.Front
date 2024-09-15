import { Component, Input } from '@angular/core';
import { ReadCourseRatingDTO } from '../../../models/Rating';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.css',
})
export class RatingCardComponent {
  @Input() ratings: ReadCourseRatingDTO[] = [];
}
