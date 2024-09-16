// carousel.service.ts
import { Injectable } from '@angular/core';
import $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  initCarousel() {
    setTimeout(() => {
      // Reinitialize the carousel
      ($('.project-carousel') as any).owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });

      ($('.project-carousel') as any).owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });
    }, 200); // Delay can be adjusted as needed
  }
}
