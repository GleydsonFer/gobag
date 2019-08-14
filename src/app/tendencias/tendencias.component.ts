import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {

  mySlideOptions={
    margin:5,
    dot: false, 
    nav: true,
    navText: [
      "<div class='nav-btn prev-slide'>prev</div>", 
      "<div class='nav-btn next-slide'>next</div>"],    
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
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
      image: "assets/banners/home/Promoções_3.jpg"
    },
    {
      link: "tendencia02",
      alt: "carnaval",
      image: "assets/banners/home/Novidades_4.jpg"
    },
    {
      link: "tendencia03",
      alt: "primaveira",
      image: "assets/banners/home/Primavera_3.jpg"
    },
    {
      link: "",
      alt: "GoBag Vip",
      image: "assets/banners/home/gobag_vip.jpg"
    },
    {
      link: "",
      alt: "Dia dos Pais",
      image: "assets/banners/home/dia_dos_pais.jpg"
    },
    {
      link: "",
      alt: "Populares",
      image: "assets/banners/home/populares.jpg"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
