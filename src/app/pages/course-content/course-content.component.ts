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
  courseId!: number;
  lessonId!: number;
  selectedLesson: Lesson | undefined;
  course: Course | null = null;

  // Inject services
  private courseDetailsSrv = inject(CourseDetailsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Listen to route parameters and fetch course/lesson details
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = +params['courseId'];
      this.lessonId = +params['lessonId'];
      this.getCourseDetails(this.courseId);
    });
  }

  // Fetch course details by ID
  getCourseDetails(id: number) {
    this.courseDetailsSrv.getCourseContent(id).subscribe({
      next: (res) => {
        this.course = res;
        this.loadLesson(); // Call to load the selected lesson
      },
      error: () => {
        this.router.navigate(['not-found']);
      },
    });
  }

  // Load the lesson based on lessonId
  loadLesson() {
    if (this.lessonId && this.course?.sections) {
      this.selectedLesson = this.course.sections
        .flatMap(section => section.lessons)
        .find(lesson => lesson.id === this.lessonId);
    }
  }

  // Handle lesson selection from the sidebar
  onLessonSelected(lesson: Lesson) {
    this.selectedLesson = lesson;
    this.router.navigate([`/course/content/${this.courseId}/${lesson.id}`])
      .then(() => this.loadLesson());
    this.cdr.detectChanges();
  }
}
