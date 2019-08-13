import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent implements OnInit {

  mySlideOptions = {
    margin: 5,
    dot: false,
    nav: true,
    navText: [
      "<div class='nav-btn prev-slide'>prev</div>",
      "<div class='nav-btn next-slide'>next</div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
        dot: true,
        nav: false
      },
      480: {  
        items: 4,
        dot: false,
        nav: true
      },
      600: {
        items: 4,
        dot: false,
        nav: true
      },
      1000: {
        items: 6,
        dot: false,
        nav: true,
        loop: false
      },
      1500: {
        items: 6,
        dot: false,
        nav: true,
        loop: false
      }
    }
  };

  mySlideImages = [
    {
      link: "loja01",
      alt: "loja01",
      image: "assets/logos-lojas/loja-teste.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    },
    {
      link: "cadastro-lojista",
      alt: "loja01",
      image: "assets/logos-lojas/sua-loja-aqui.png"
    }

  ]

  constructor() { }

  ngOnInit() {
  }

}
