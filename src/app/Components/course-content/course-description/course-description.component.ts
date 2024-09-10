import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-course-description',
  standalone: true,
  imports: [],
  templateUrl: './course-description.component.html',
  styleUrl: './course-description.component.css',
})
export class CourseDescriptionComponent  {
  @Input({ required: true }) description!: string | undefined;

  
  
}
