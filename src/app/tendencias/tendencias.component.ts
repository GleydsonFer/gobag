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
      image: "assets/banners/home/Promoções_2.jpg"
    },
    {
      link: "tendencia02",
      alt: "carnaval",
      image: "assets/banners/home/Novidades_2.jpg"
    },
    {
      link: "tendencia03",
      alt: "primaveira",
      image: "assets/banners/home/Primavera_2.jpg"
    },
    {
      link: "tendencia01",
      alt: "30%off",
      image: "assets/banners/home/Promoções_2.jpg"
    },
    {
      link: "tendencia02",
      alt: "carnaval",
      image: "assets/banners/home/Novidades_2.jpg"
    },
    {
      link: "tendencia03",
      alt: "primaveira",
      image: "assets/banners/home/Primavera_2.jpg"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
