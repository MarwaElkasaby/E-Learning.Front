import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  selectedCategoryId: number = 0;
  selectedCategoryName: string = '';
  courses: any[] = [];
  pagedCourses: any[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
      if (this.categories.length > 0) {
        this.selectedCategoryId = this.categories[0].id;
        this.selectedCategoryName = this.categories[0].name;
        this.fetchCourses();
      }
    });
  }

  fetchCourses(): void {
    this.categoryService.getCoursesByCategory(this.selectedCategoryId).subscribe((data: any) => {
      this.courses = data.courses;
      this.calculatePagination();
    });
  }

  onCategoryChange(): void {
    this.selectedCategoryId = this.categories.find(category => category.id === this.selectedCategoryId).id;
    this.currentPage = 1;
    this.fetchCourses();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.courses.length / this.pageSize);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCourses = this.courses.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }
}
