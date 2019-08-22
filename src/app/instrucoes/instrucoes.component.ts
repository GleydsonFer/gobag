import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrucoes',
  templateUrl: './instrucoes.component.html',
  styleUrls: ['./instrucoes.component.css']
})
export class InstrucoesComponent implements OnInit {

  mySlideOptions = {
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    loop: false,
    margin: 10,
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
        nav: false,
        loop: true
      },
      500: {
        items: 2,
        dot: false,
        nav: false,
        loop: true
      },
      1000: {
        items: 4,
        dot: false,
        nav: false
      },
      1500: {
        items: 4,
        dot: false,
        nav: false,
      },
      2000: {
        items: 4,
        dot: false,
        nav: false,
      }
    }
  };

  mySlideImages = [
    {
      alt: "loja01",
      image: "/assets/banners/home/banner-bolsa.png"
    },
    { 
      alt: "loja01",
      image: "/assets/banners/home/banner-relogio.png"
    },
    { 
      alt: "loja01",      
      image: "/assets/banners/home/banner-camisa.png"
    },
    {  
      alt: "loja01",
      image: "/assets/banners/home/banner-retorne.png"
    },
    
  ]

  constructor() { }

  ngOnInit() {
  }
}