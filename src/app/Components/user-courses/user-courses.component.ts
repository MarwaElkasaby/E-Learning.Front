import { Component } from '@angular/core';
import { CourseCardComponent } from "../course-card/course-card.component";
import { CoursesService } from '../../shared/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IEnrolledCourse } from '../../shared/interfaces/course-data';

@Component({
  selector: 'app-user-courses',
  standalone: true,
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css'],
  imports: [CourseCardComponent, NgClass, NgIf, FormsModule, NgFor],
})
export class UserCoursesComponent {
  id!: any;
  EnrolledCourses: IEnrolledCourse[] = [];
  filteredCourses: IEnrolledCourse[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(
    private CoursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : undefined;
      this.loadEnrolledCourses(this.id);
    });
  }

  loadEnrolledCourses(UserId: any) {
    this.CoursesService.getAllUserCourses(UserId).subscribe((Courses) => {
      this.EnrolledCourses = Courses;
      this.filteredCourses = Courses;
      this.extractCategories(Courses);
    });
  }

  // Extract unique categories from the courses
  extractCategories(courses: IEnrolledCourse[]) {
    const uniqueCategories = new Set(courses.map(course => course.categoryName));
    this.categories = Array.from(uniqueCategories);
  }

  // Filter courses based on search term and selected category
  onSearch() {
    const searchValue = this.searchTerm.toLowerCase().trim();
    this.applyFilters(searchValue, this.selectedCategory);
  }

  // Handle category selection
  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.applyFilters(this.searchTerm.toLowerCase().trim(), category);
  }

  // Apply search and category filters
  applyFilters(searchValue: string, category: string) {
    this.filteredCourses = this.EnrolledCourses.filter(course =>
      (searchValue === '' || course.title.toLowerCase().includes(searchValue)) &&
      (category === '' || course.categoryName === category)
    );
  }
}
