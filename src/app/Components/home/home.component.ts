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
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink, CarouselModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  token!: any;
  tokendata: any;
  username : string='';


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

  
}


// private initCarousel(): void {
//   if (typeof window !== 'undefined' && typeof $ !== 'undefined') {
//     // Initialize owlCarousel
//     ($('.testimonial-carousel') as any).owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       margin: 25,
//       loop: true,
//       center: true,
//       dots: false,
//       nav: true,
//       navText: [
//         '<i class="bi bi-chevron-left"></i>',
//         '<i class="bi bi-chevron-right"></i>'
//       ],
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         992: { items: 3 }
//       }
//     });
//   } else {
//     console.error('jQuery or OwlCarousel is not available');
//   }
// }

// ngAfterViewInit(): void {
//   this.initCarousel();
// }






// ngAfterViewInit(): void {
//   // Ensure jQuery is run after the view has fully initialized
//   setTimeout(() => {
//     this.initCarousels();
//   }, 0); // 0 ensures it's executed after the current execution stack
// }

// private initCarousels() {
//   if (typeof window !== 'undefined') { // Check if we are in a browser environment
//     ($('.project-carousel') as any).owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       margin: 25,
//       loop: true,
//       center: true,
//       dots: false,
//       nav: true,
//       navText: [
//         '<i class="bi bi-chevron-left"></i>',
//         '<i class="bi bi-chevron-right"></i>'
//       ],
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         992: { items: 3 }
//       }
//     });

//     ($('.testimonial-carousel') as any).owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       center: true,
//       margin: 24,
//       dots: true,
//       loop: true,
//       nav: false,
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         992: { items: 3 }
//       }
//     });
//   }
// }


// ngAfterViewInit(): void {
//   this.renderer.listen('window', 'load', () => {
//     this.initCarousels();
//   });
// }

// private initCarousels() {
//   if (typeof window !== 'undefined') {
//     ($('.project-carousel') as any).owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       margin: 25,
//       loop: true,
//       center: true,
//       dots: false,
//       nav: true,
//       navText: [
//         '<i class="bi bi-chevron-left"></i>',
//         '<i class="bi bi-chevron-right"></i>'
//       ],
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         992: { items: 3 }
//       }
//     });

//     ($('.testimonial-carousel') as any).owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       center: true,
//       margin: 24,
//       dots: true,
//       loop: true,
//       nav: false,
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         992: { items: 3 }
//       }
//     });
//   }
// }


// ngAfterViewInit(): void {
//   this.cdr.detectChanges(); // Trigger change detection
//   this.initCarousels();
// }

// private initCarousels() {
//   if (typeof window !== 'undefined') { // Check if we are in a browser environment
//     ($('.project-carousel') as any).owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       margin: 25,
//       loop: true,
//       center: true,
//       dots: false,
//       nav: true,
//       navText: [
//         '<i class="bi bi-chevron-left"></i>',
//         '<i class="bi bi-chevron-right"></i>'
//       ],
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         992: { items: 3 }
//       }
//     });

//     ($('.testimonial-carousel') as any).owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       center: true,
//       margin: 24,
//       dots: true,
//       loop: true,
//       nav: false,
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         992: { items: 3 }
//       }
//     });
//   }}

}