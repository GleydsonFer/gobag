import { style } from '@angular/animations';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ItemCarrinho } from 'src/app/shared/item-carrinho.model';
import { CarrinhoService } from 'src/app/carrinho.service';
import { Router, NavigationEnd } from '@angular/router';
import { Carrinho } from 'src/app/shared/carrinho.model';

@Component({
  selector: 'item-carrinho-compra',
  templateUrl: './item-carrinho-compra.component.html',
  styleUrls: ['./item-carrinho-compra.component.css']
})
export class ItemCarrinhoCompraComponent implements OnInit {

  @Input() carrinho: Carrinho = new Carrinho();
  reordenar: boolean = false;

  @ViewChild('carousel') elementoTeste: HTMLElement;

  public itensCarrinho: ItemCarrinho[] = []

  mySlideOptions = {
    margin: 5,
    draggable: false,
    dot: false,
    nav: true,
    navText: [
      "<div class='nav-btn prev-slide'>prevteste</div>",
      "<div class='nav-btn next-slide'>next</div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        dot: false,
        nav: true
      },
      600: {
        items: 4,
        dot: false,
        nav: true
      },
      1000: {
        items: 7,
        dot: false,
        nav: true,
        loop: false
      },
      1500: {
        items: 12,
        dot: false,
        nav: true,
        loop: false
      }
    }
  };
  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) { }


  ngOnInit() {
    this.itensCarrinho = this.carrinho.itens;
  }

  public adicionar(item: ItemCarrinho, index: number): void {
    this.carrinhoService.adicionarQuantidade(item, index);
  }

  public diminuir(item: ItemCarrinho, index: number): void {
    this.carrinhoService.diminuirQuantidade(item, index)
    //codigo para controle de reordenação  do carousel
    // if (item.quantidade < 1) {
    //   if (this.reordenar == false) {
    //     this.reordenar = true;
    //     // this.ajustCarousel()
    //   } else {
    //     this.reordenar = false;
    //     // this.ajustCarousel()
    //   }
    // }
  }
  // ngAfterViewInit() {
  //   // this.ajustCarousel()
  // }

  // onClick() {
  //   // this.ajustCarousel();
  // }

  // mouseenter() {
  //   // this.ajustCarousel()
  // }

  // mousemove() {
  //   // this.ajustCarousel()
  // }
  // ajustCarousel() {
  //   if (this.carrinho != null) {
  //     var nav = document.querySelector(".owl-nav");
  //     var stage = document.querySelector(".owl-stage");
  //     var prev = document.querySelector(".owl-prev");
  //     var next = document.querySelector(".owl-next");
  //     prev.setAttribute("style", "background-image:none !important; color:black; font-size:50px; position:absolute;left:-7%")
  //     next.setAttribute("style", "background-image:none !important; color:black ; font-size:50px;position:absolute;right: -7%;")
  //     // stage.setAttribute("class", "d-flex")
  //     next.parentElement.children[0].innerHTML = "<img src='../../../assets/left.png' alt=''> "
  //     prev.parentElement.children[1].innerHTML = "<img src='../../../assets/right.png' alt=''>"
  //     // stage.children[0].classList.add('ml-3')
  //     stage.classList.add('d-flex')
  //     stage.classList.add('flex-row')
  //     if (nav.classList[1] == "disabled") {
  //       stage.setAttribute("style", "transform:none !important")
  //     }
  //   }
  // }
}





