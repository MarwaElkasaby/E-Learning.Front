import {
  Component,
  Inject,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-video-player',
  standalone: true,
  imports: [],
  templateUrl: './course-video-player.component.html',
  styleUrl: './course-video-player.component.css',
})
export class CourseVideoPlayerComponent  {
  @Input({ required: true }) content!: string;

  
}
