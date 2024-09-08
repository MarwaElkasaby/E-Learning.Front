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
export class CourseVideoPlayerComponent implements OnChanges {
  @Input({ required: true }) content!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      if (changes['content'].firstChange) {
        console.log(changes);
        this.content = changes['content'].currentValue;
        console.log(this.content);
      } else {
        this.content = changes['content'].previousValue;
        console.log(this.content);
      }
      this.reloadVideo();
    }
  }

  reloadVideo() {
    const video: HTMLVideoElement = document.querySelector('video')!;
    if (video) {
      video.load(); // Force the video to reload with the new source
    }
  }
}
