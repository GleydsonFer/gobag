
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AutenticacaoGuard } from '../autenticacao-guard.service';
import {CarrinhoService} from '../carrinho.service';
import { OfertasService } from '../ofertas.service';
import { Produto } from '../shared/produto.model';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]

})
export class OfertaComponent implements OnInit, OnDestroy {

  public tamanho: any[] = [];
  public produto: Observable<any>;
  @Output() public prod: Produto;
  public aux: any[] = ['selecionado', 'valor']

  public naoLogado: any;
  imagem_selecionada: any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService,
    private toastr: ToastrService,
    private autenticacaoGuard: AutenticacaoGuard,
    private afauth: AngularFireAuth
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      this.produto = this.ofertasService.getProdutoByID(parametros.id_produto);
      this.produto.subscribe(prod => {
        this.tamanho = []
        for (var [key, value] of Object.entries(prod[0].tamanho)) {
          this.tamanho.push({ key, value, selecionado: false })
        }
        this.tamanho.reverse();
        
        let aux: any;
        // troca os tamanhos para a ordem certa
        aux = this.tamanho[3];
        this.tamanho[3] = this.tamanho[4];
        this.tamanho[4] = aux;

        console.log(this.tamanho);
        this.prod = prod[0];
        this.imagem_selecionada = prod[0].imagens[0];
      })
    })
  }

  ngOnDestroy() { }

  // Função para adicionar itens ao carrinho
  public adicionarItemCarrinho(): void {

    // recupera a referencia do usuário logado para pegar seu email
    this.afauth.auth.onAuthStateChanged(user => {

      this.tamanho.forEach(item => {
        if (item.selecionado == true) {
          this.aux[0] = true
          this.aux[1] = item.key;
        }
      })
      if (this.aux[0] == true) {
        this.naoLogado = this.autenticacaoGuard.canActivateVerOfertaNaoLogado();

        if (this.naoLogado) {
          this.prod.tamanho = this.aux[1];
          this.carrinhoService.incluirItem(this.prod, user)
          this.toastr.success('Oferta adicionada com sucesso!', `${this.prod.nome}`);
         
        }
      } else {
        this.toastr.error('Você deve selecionar um tamanho primeiro!')
      }

    })
  }

  conferirNull(value, selecionado) {
    if (value !== null && value !== undefined && value !== "0") {
      if (selecionado == true) {
        return {
          'tamanho_disponivel selecionado': true
        }
      } else {
        return {
          'tamanho_disponivel': true
        }
      }

    } else {
      return {
        'tamanho_indisponivel': true
      }
    }
  }

  selecionarTamanho(value) {
    this.tamanho.forEach((item) => {
      if ((value.key == item.key) && (value.value !== null)) {
        item.selecionado = true
      } else {
        item.selecionado = false
      }
    })
  }

  mudarImagem(i: number){
    this.imagem_selecionada = this.prod.imagens[i];
  }

  prevImage(){
    let i = this.prod.imagens.indexOf(this.imagem_selecionada);
    if(i > 0){
      this.imagem_selecionada = this.prod.imagens[i-1];
    }else {
      this.imagem_selecionada = this.prod.imagens[this.prod.imagens.length-1];
    }
  }

  nextImage(){
    let i = this.prod.imagens.indexOf(this.imagem_selecionada);
    if(i < this.prod.imagens.length-1){
      this.imagem_selecionada = this.prod.imagens[i+1];
    }else {
      this.imagem_selecionada = this.prod.imagens[0];
    }
  }

}
