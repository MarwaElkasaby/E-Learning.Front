import { ChangeDetectorRef, Component, OnInit,Renderer2 } from '@angular/core';
import { CoursesService } from '../../shared/services/courses.service';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../shared/services/category.service';
import { response } from 'express';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CarouselService } from '../../shared/services/carousel.service';
import { FormsModule } from '@angular/forms';

import $ from 'jquery'
import { CourseCardComponent } from "../course-card/course-card.component";
import { IEnrolledCourse } from '../../shared/interfaces/course-data';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselModule, FormsModule, CourseCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  token!: any;
  tokendata: any;
  username : string='';

// EnrolledCourses: IEnrolledCourse[] = [];
courses:any[]=[]
categories:any[]=[]
userId:any='';
userData:any;

constructor (private _CoursesService:CoursesService, private _CategoryService:CategoryService,
   private _ActivatedRoute:ActivatedRoute, private carouselService:CarouselService, private renderer: Renderer2,private cdr: ChangeDetectorRef){

    

    if(typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
        
        if (this.token) {
          this.tokendata = JSON.parse(atob(this.token.split('.')[1]));
    
          // Extracting user ID, username, and role
          this.username = this.tokendata['sub']; // Username claim
          console.log(this.username);
    
        }
   }

ngOnInit(): void {          console.log(this.username);


  
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      //shayl kol eli fe el url

      if(params.get('id')){
        this.userId=params.get('id');

        
      }
    }
  })

  console.log(this.userId)
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
console.log(this.courses);

  
}

}