import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../shared/services/courses.service';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../shared/services/category.service';
import { response } from 'express';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
constructor (private _CoursesService:CoursesService, private _CategoryService:CategoryService){}

courses:any[]=[]
categories:any[]=[]
ngOnInit(): void {
  this._CoursesService.getAllCourses().subscribe(
    {
      next:(response)=>{
        console.log(response);
        this.courses=response;
      }
    }
  )

  this._CategoryService.getCategories().subscribe({
    next:(response)=>{
      this.categories=response;
    }
  })
}

}