import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Lesson, Section } from '../../models/CourseDetails';
import { CourseDetailsService } from '../../shared/services/course/course-details-service/course-details.service';
import { CourseVideoPlayerComponent } from '../../Components/course-content/course-video-player/course-video-player.component';
import { CourseDescriptionComponent } from '../../Components/course-content/course-description/course-description.component';
import { SectionsSidebarComponent } from '../../Components/course-content/sections-sidebar/sections-sidebar.component';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [
    CourseVideoPlayerComponent,
    CourseDescriptionComponent,
    SectionsSidebarComponent,
  ],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css',
})
export class CourseContentComponent {
  courseId: number | undefined;
  lessonId: number | undefined;
  selectedLesson: Lesson | undefined; // Update to 'Lesson' type to match the actual data type.
  course: Course | null = null;

  // Inject services
  courseDetailsSrv = inject(CourseDetailsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // Fetch course details by ID
  getCourseDetails(id: number) {
    this.courseDetailsSrv.getCourseContent(1).subscribe({
      next: (res) => {
        this.course = res;
        console.log(res);
        this.loadLesson(); // Call to load the selected lesson
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['not-found']);
      },
    });
  }

  // Fetch the selected lesson by lessonId
  loadLesson() {
    if (this.lessonId && this.course?.sections) {
      for (const section of this.course.sections) {
        for (const lesson of section.lessons) {
          if (lesson.id === this.lessonId) {
            this.selectedLesson = lesson;
            return;
          }
        }
      }
    }
  }

  ngOnInit(): void {
    // Retrieve courseId and lessonId from the URL
    const courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    const lessonId = this.activatedRoute.snapshot.paramMap.get('lessonId');

    if (courseId && lessonId) {
      // Ensure the parameters exist
      this.courseId = +courseId;
      this.lessonId = +lessonId;
      this.getCourseDetails(this.courseId);
    } else {
      this.router.navigate(['not-found']); // Handle missing parameters
    }
  }
  cdr = inject(ChangeDetectorRef);
  // Handle lesson selection from the sidebar
  onLessonSelected(lesson: Lesson) {
    this.selectedLesson = lesson;
    console.log('Selected Lesson:', this.selectedLesson); // Should log the updated lesson
    // Update the URL when a new lesson is selected and reload the lesson details

    this.router
      .navigate([`/course/content/${this.courseId}/${lesson.id}`])
      .then(() => {
        this.loadLesson(); // Reload lesson after URL update
      });
    this.cdr.detectChanges();
  }
}
