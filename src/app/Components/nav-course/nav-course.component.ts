import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareModalComponent } from '../share-modal/share-modal.component';

@Component({
  selector: 'app-nav-course',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-course.component.html',
  styleUrl: './nav-course.component.css',
})
export class NavCourseComponent {
  @Input() courseId!: number;
  @Input() courseTitle!: string;
  @Input() progressPercentage?: number;
  isNavbarOpen = false;

  constructor(private modalService: NgbModal) {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }


  openShareModal() {
    const shareLink = `http://localhost:4200/course/${this.courseId}`;
    const modalRef = this.modalService.open(ShareModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.shareLink = shareLink;
  }
}
