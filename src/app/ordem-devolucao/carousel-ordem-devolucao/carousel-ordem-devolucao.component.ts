import { ItemCarrinho } from 'src/app/shared/item-carrinho.model';
import { Component, OnInit, ɵConsole, Output, EventEmitter } from '@angular/core';
import { DevolucaoService } from 'src/app/devolucao.service';

@Component({
  selector: 'app-carousel-ordem-devolucao',
  templateUrl: './carousel-ordem-devolucao.component.html',
  styleUrls: ['./carousel-ordem-devolucao.component.css']
})
export class CarouselOrdemDevolucaoComponent implements OnInit {

  // public pedido: ItemCarrinho[] = [
  //   {
  //     'anunciante': "Zara",
  //     'descricao': "Blazer de colarinho e lapela em V, e com manga comprida com acabamento em punho com detalhe de botões. Bolsos de debrum no peito e de aba no quadril. Detalhe de bolso interior. Bainha com abertura dupla nas costas. Fecho frontal com botões.",
  //     'id_produto': "1564444054951",
  //     'imagem': "https://firebasestorage.googleapis.com/v0/b/gobag-delivery.appspot.com/o/produtos%2F7ADxw9WBW7w8bz9NPTiM%2Fimg0?alt=media&token=4e3c241e-bebd-4b5e-8268-6ba0f540cf45",
  //     'nome': "Blazer Conjunto",
  //     'quantidade': 4,
  //     'tamanho': "G",
  //     'valor': 729
  //   },
  //   {
  //     'anunciante': "Riachuelo",
  //     'descricao': "VESTIDO LONGO PAOLA NEOPRENE COM CINTO MODA EVANGÉLICA",
  //     'id_produto': "1564495639622",
  //     'imagem': "https://firebasestorage.googleapis.com/v0/b/gobag-delivery.appspot.com/o/produtos%2FFhd7rAj7XGDl872SeYXW%2Fimg1?alt=media&token=41f06c96-6244-4fac-a4fc-5f7a82d92fc7",
  //     'nome': "Vestido Longo",
  //     'quantidade': 7,
  //     'tamanho': "M",
  //     'valor': 198
  //   },
  //   {
  //     'anunciante': "c&a",
  //     'descricao': "leve e colorida",
  //     'id_produto': "1564273620056",
  //     'imagem': "https://firebasestorage.googleapis.com/v0/b/gobag-delivery.appspot.com/o/produtos%2Fuyk30pAqynn0RJ4Te5Aj%2Fimg0?alt=media&token=6f4126c8-c511-423e-acf4-708ec79c7da6",
  //     'nome': "Saia Floral",
  //     'quantidade': 5,
  //     'tamanho': "p",
  //     'valor': 39.9
  //   },
  // ]

  backupPedido: any[] = []
  public aux: boolean = true;
  public quantInicial: number = 0;
  public itemAtual: any;

  constructor(
    private devolucao: DevolucaoService
  ) { }


  ngOnInit() {
    this.devolucao.pedidoAtual().then(resolve=>{
      // this.pedido = resolve
      //iniciando carrinho de devolução com quantidade 0
      resolve.forEach(item => {
        this.devolucao.carrinhoDevol.push({
          'anunciante': item.anunciante,
          'descricao': item.descricao,
          'id_produto': item.id_produto,
          'imagem': item.imagem,
          'nome': item.nome,
          'quantidade': 0,
          'tamanho': item.tamanho !== undefined ?  item.tamanho  : '',
          'valor': item.valor
        })
      });
    })


  }
  diminuir(itemPedido, itemHtml) {

    /* toda lógica de decrementar limitando sempre em quantidade mínima 0 */
    var result = this.backupPedido.find((item) => (item.id_produto == itemPedido.id_produto))
    if (!result) {
      this.backupPedido.push({ id_produto: itemPedido.id_produto, quantidade: itemPedido.quantidade })
      result = this.backupPedido.find((item) => (item.id_produto == itemPedido.id_produto))
      itemPedido.quantidade = result.quantidade
    }
    if (this.aux) {
      this.itemAtual = itemPedido
      this.aux = false
    } else if (itemPedido !== this.itemAtual) {
      this.itemAtual = itemPedido
    }
    if (itemPedido.quantidade > 0) {
      itemPedido.quantidade--
      this.adicionarDevol(result, itemPedido)
      if (itemPedido.quantidade == result.quantidade) {
        this.corVerde(itemHtml)
      } else if (itemPedido.quantidade > 0) {
        this.corAmarela(itemHtml)
      } else {
        this.corVermelha(itemHtml)
      }
    }

  }

  adicionar(itemPedido, itemHtml) {
    /* toda lógica de incrementar limitando sempre em quantidade máxima recebida pela ordem-pedido */
    var result = this.backupPedido.find((item) => (item.id_produto == itemPedido.id_produto))
    if (itemPedido !== this.itemAtual) {
      if (!result) {
        this.backupPedido.push({ id_produto: itemPedido.id_produto, quantidade: itemPedido.quantidade })
        result = this.backupPedido.find((item) => (item.id_produto == itemPedido.id_produto))
      }
      this.itemAtual = itemPedido
    }
    if (itemPedido.quantidade < result.quantidade) {
      itemPedido.quantidade++
      if (itemPedido.quantidade == result.quantidade) {
        this.corVerde(itemHtml)
      } else if (itemPedido.quantidade > 0) {
        this.corAmarela(itemHtml)
      } else {
        this.corVermelha(itemHtml)
      }
      this.adicionarDevol(result, itemPedido)
    }
  }

  adicionarDevol(result?, itemPedido?) {
    let devolucao = this.devolucao.carrinhoDevol.find((item) => (item.id_produto == itemPedido.id_produto))
    devolucao.quantidade = result.quantidade - itemPedido.quantidade
  }


  confirmarDevolucao() {
  }


  corVerde(item) {
    item.classList.add("corVerde");
    item.classList.remove("corAmarela")
    item.classList.remove("corVermelha")
  }
  corAmarela(item) {
    item.classList.add("corAmarela")
    item.classList.remove("corVerde")
    item.classList.remove("corVermelha")
  }
  corVermelha(item) {
    item.classList.add("corVermelha")
    item.classList.remove("corAmarela")
    item.classList.remove("corVerde")

  }




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

  //configurações do carousel
  ajustCarousel() {
    var nav = document.querySelector(".owl-nav");
    var stage = document.querySelector(".owl-stage");
    var prev = document.querySelector(".owl-prev");
    var next = document.querySelector(".owl-next");
    prev.setAttribute("style", "background-image:none !important; color:black; font-size:50px; position:absolute;left:-7%")
    next.setAttribute("style", "background-image:none !important; color:black ; font-size:50px;position:absolute;right: -7%;")
    // stage.setAttribute("class", "d-flex")
    next.parentElement.children[0].innerHTML = "<img src='../../../assets/left.png' alt=''> "
    prev.parentElement.children[1].innerHTML = "<img src='../../../assets/right.png' alt=''>"
    // stage.children[0].classList.add('ml-3')
    stage.classList.add('d-flex')
    stage.classList.add('flex-row')
    if (nav.classList[1] == "disabled") {
      stage.setAttribute("style", "transform:none !important")
    }
  }
  onClick() {
    this.ajustCarousel();
  }

  mouseenter() {
    this.ajustCarousel()
  }

  mousemove() {
    this.ajustCarousel()
  }
}
