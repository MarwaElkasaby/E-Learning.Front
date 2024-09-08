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

//carousel 
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
//category option
CategoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}

slidesStore:any[]=[
{
  title: 'Technology',
 src: 'https://t4.ftcdn.net/jpg/00/81/38/59/360_F_81385977_wNaDMtgrIj5uU5QEQLcC9UNzkJc57xbu.jpg'
},
{
  title: 'Science',
 src: 'https://as1.ftcdn.net/v2/jpg/00/85/08/26/1000_F_85082630_sPdo1t2MYqN3KKA5nuLTeW9uHFom0T7j.jpg'
},
{
  title: 'Health',
 src: 'https://t4.ftcdn.net/jpg/00/75/12/91/360_F_75129190_f4MGrrWi8zwEUNSSZ440NStMeriRcHA7.jpg'
},
{
  title: 'Sports',
 src: 'https://t4.ftcdn.net/jpg/04/98/12/81/360_F_498128114_DcWdaZpwrSVZGwVQiT67hHHy7eXzD4F1.jpg'
},
{
  title: 'Entertainment',
 src: 'https://t4.ftcdn.net/jpg/05/56/50/61/360_F_556506187_Fk3MsHwinhHbAFTbwlZVoEbYpVOTOR1v.jpg'
},
{
  title: 'Travel',
 src: 'https://media.istockphoto.com/id/1264262254/photo/wooden-cubes-with-two-stars-out-of-five-concept-of-poor-service-rating-and-evaluation.jpg?b=1&s=170667a&w=0&k=20&c=KR9XGwBJGJIQecgymbt2ykMXQJ34gr-4brWhBf4M62E='
},
{
  title: 'Finance',
 src: 'https://t3.ftcdn.net/jpg/05/36/44/30/360_F_536443091_rOnp6ZeGxATsb58HLm7xWAPor2Boa0pG.jpg'
},
{
  title: 'Education',
 src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxlqMxQa3VwoKrF6tQIF7xsHTc_ASIaB6qCfLb85Kifm4u_rbiU7Rmc8Bgep0bjKOi-A&usqp=CAU'
}
]
//hero slider
slides = [
  { img: 'https://i.pinimg.com/736x/9e/68/76/9e687619650116619f0d6affdd31fa6b.jpg' },
  { img: 'https://i.pinimg.com/236x/65/da/d1/65dad12f3d521bd547ea6b0ee24303d8.jpg' },
];
currentSlide = 0;


  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }
}
