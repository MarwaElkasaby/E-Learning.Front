import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Lesson, Section } from '../../models/CourseDetails';
import { CourseDetailsService } from '../../shared/services/course/course-details-service/course-details.service';
import { CourseVideoPlayerComponent } from '../../Components/course-content/course-video-player/course-video-player.component';
import { CourseDescriptionComponent } from '../../Components/course-content/course-description/course-description.component';
import { SectionsSidebarComponent } from '../../Components/course-content/sections-sidebar/sections-sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [
    CourseVideoPlayerComponent,
    CourseDescriptionComponent,
    SectionsSidebarComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css',
})
export class CourseContentComponent {
  courseId!: number;
  lessonId!: number;
  selectedLesson: Lesson | undefined;
  course: Course | null = null;
  progressPercentage!: number;

  courseDetailsSrv = inject(CourseDetailsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = +params['courseId'];
      if (!params['lessonId']) {
        this.lessonId = this.course?.sections[0].lessons[0].id!;
      }
      this.lessonId = +params['lessonId'];
      this.getCourseDetails(this.courseId);
    });
  }

  getCourseDetails(id: number) {
    this.courseDetailsSrv.getCourseContent(id).subscribe({
      next: (res) => {
        this.course = res;
        this.progressPercentage =
          this.course?.studentEnrollment?.progressPercentage || 0;
        this.selectedLesson = this.course?.sections[0].lessons[0];
        this.loadLesson();
      },
      error: () => {
        this.router.navigate(['not-found']);
      },
    });
  }

  loadLesson() {
    if (this.lessonId && this.course?.sections) {
      this.selectedLesson = this.course.sections
        .flatMap((section) => section.lessons)
        .find((lesson) => lesson.id === this.lessonId);
    }
  }

  onLessonSelected(lesson: Lesson) {
    this.selectedLesson = lesson;
    this.router
      .navigate([`/course/content/${this.courseId}/${lesson.id}`])
      .then(() => this.loadLesson());
    this.cdr.detectChanges();
  }

  onProgressUpdated() {
    // Get total lessons across all sections
    const totalLessons =
      this.course?.sections.flatMap((section) => section.lessons).length || 0;

    // Get completed lessons from student enrollment
    const completedLessons =
      this.course?.studentEnrollment.completedLessons || 0;

    // Ensure totalLessons is greater than 0 to avoid division by zero
    if (totalLessons > 0) {
      // Calculate progress percentage
      this.progressPercentage = (completedLessons / totalLessons) * 100;
    } else {
      this.progressPercentage = 0; // Handle case when there are no lessons
    }

    console.log('Total Lessons:', totalLessons);
    console.log('Completed Lessons:', completedLessons);
    console.log('Progress Percentage:', this.progressPercentage);
  }
}
