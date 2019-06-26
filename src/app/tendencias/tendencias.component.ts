import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {

  mySlideOptions={
    margin:25,
    dot: false, 
    nav: true,
    navText: ["<div class='nav-btn prev-slide'>prev</div>", "<div class='nav-btn next-slide'>next</div>"],    
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dot: false,
        nav: true
      },
      600: {
        items: 2,
        dot: false,
        nav: true
      },
      1000: {
        items: 3,
        dot: false,
        nav: true,
        loop: false
      },
      1500: {
        items: 4,
        dot: false,
        nav: true,
        loop: false
      }
    }
  };

  mySlideImages = [
    {
      link: "tendencia01",
      alt: "30%off",
      image: "assets/banners/banner1.png"
    },
    {
      link: "tendencia02",
      alt: "carnaval",
      image: "assets/banners/banner2.png"
    },
    {
      link: "tendencia03",
      alt: "primaveira",
      image: "assets/banners/banner3.png"
    },
    {
      link: "tendencia01",
      alt: "30%off",
      image: "assets/banners/banner1.png"
    },
    {
      link: "tendencia02",
      alt: "carnaval",
      image: "assets/banners/banner2.png"
    },
    {
      link: "tendencia03",
      alt: "primaveira",
      image: "assets/banners/banner3.png"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
