import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-slide',
  templateUrl: './banner-slide.component.html',
  styleUrls: ['./banner-slide.component.css']
})
export class BannerSlideComponent implements OnInit {
  mySlideOptions={
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    loop: true,
    dot: true, 
    nav: true,
    navText: ["<div class='nav-btn prev-slide'>prev</div>", "<div class='nav-btn next-slide'>next</div>"],    
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dot: false,
        nav: true
      }
    }
  };

  mySlideImages = [
    {      
      alt: "GoBag Brasil",
      image: "assets/banners/home/banner_home_3.png"
    },
    {
      alt: "Como Funciona?",
      image: "assets/banners/home/banner_home_2.png"
    },
    {
      alt: "Experimente!",
      image: "assets/banners/home/banner_home_1.jpg"
    }
  ]

  

  constructor() { }

  ngOnInit() {
  }

}
