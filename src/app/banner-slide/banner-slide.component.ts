import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-slide',
  templateUrl: './banner-slide.component.html',
  styleUrls: ['./banner-slide.component.css']
})
export class BannerSlideComponent implements OnInit {
  mySlideOptions={
    dot: false, 
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

//   $(function() {
//     $(".video").click(function () {
//       var theModal = $(this).data("target"),
//       videoSRC = $(this).attr("data-video"),
//       videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
//       $(theModal + ' iframe').attr('src', videoSRCauto);
//       $(theModal + ' button.close').click(function () {
//         $(theModal + ' iframe').attr('src', videoSRC);
//       });
//     });
//   });
 }
