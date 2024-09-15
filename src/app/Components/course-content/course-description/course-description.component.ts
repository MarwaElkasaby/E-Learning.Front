import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output, // <-- Add Output for emitting events
} from '@angular/core';
import {
  NgbModal,
  NgbModalModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailsService } from '../../../shared/services/course/course-details-service/course-details.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../../models/CourseDetails';
import { RatingModalComponent } from '../rating-modal/rating-modal.component';

@Component({
  selector: 'app-course-description',
  standalone: true,
  imports: [NgbModalModule, CommonModule, NgbProgressbarModule],
  templateUrl: './course-description.component.html',
  styleUrl: './course-description.component.css',
})
export class CourseDescriptionComponent {
  @Input() courseId!: number;
  @Input() progressPercentage!: number;
  @Input({ required: true }) selectedLesson!: Lesson;

  @Output() progressUpdated = new EventEmitter<void>();

  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  toastr = inject(ToastrService);
  modalService = inject(NgbModal);
  courseDetailsSrv = inject(CourseDetailsService);

  markAsCompleted() {
    if (!this.selectedLesson.id || this.selectedLesson.isCompleted) {
      return;
    }

    this.loadingSubject.next(true);
    this.courseDetailsSrv
      .markLessonAsCompleted(this.selectedLesson.id, this.courseId)
      .subscribe({
        next: () => {
          this.selectedLesson.isCompleted = true;
          this.progressUpdated.emit(); // Notify parent to update progress
        },
        error: () => {
          this.toastr.error('Something went wrong');
          this.loadingSubject.next(false);
        },
        complete: () => {
          this.loadingSubject.next(false);
        },
      });
  }

  openRatingModal() {
    const modalRef = this.modalService.open(RatingModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.courseId = this.courseId;
  }
}
