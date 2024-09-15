import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../shared/services/courses.service';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../shared/services/category.service';
import { response } from 'express';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
constructor (private _CoursesService:CoursesService, private _CategoryService:CategoryService,
   private _ActivatedRoute:ActivatedRoute){


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

   token: any;
  tokendata: any;
  username !: string;


courses:any[]=[]
categories:any[]=[]
userId:any='';
userData:any;

ngOnInit(): void {

  
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

  
}




}