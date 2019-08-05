import { Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Autenticacao } from '../autenticacao.service';
import CarrinhoService from '../carrinho.service';
import { OfertasService } from '../ofertas.service';
import { Produto } from '../shared/produto.model';
import { UsuarioService } from './../usuario.service';
import { BehaviorSubject } from 'rxjs';
import { Carrinho } from '../shared/carrinho.model';

@Component({
  selector: 'app-topo-logado',
  templateUrl: './topo-logado.component.html',
  styleUrls: ['./topo-logado.component.css'],
  providers: [OfertasService]
})
export class TopoLogadoComponent implements OnInit {

  usuario: any;
  enderecoEntrega: string;
  numeroEntrega: string;
  numeroItensCarrinho: number;
  widthScreen: boolean = true;
  produtos: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
  carrinhoObservable: Observable<any>;
  carrinho: Carrinho;

  constructor(
    private ofertasService: OfertasService,
    private autenticacao: Autenticacao,
    private carrinhoService: CarrinhoService,
    private afs: AngularFirestore,
    public afauth: AngularFireAuth,
    public userService: UsuarioService
  ) { }

  ngAfterViewInit(): void {
    this.resize()
  }

  resize() {
    if (screen.width > 820) {
      this.widthScreen = true
    } else {
      this.widthScreen = false
    }
  }
  ngOnInit() {
    var aux

    this.produtos = this.ofertasService.pesquisaProdutos(this.startAt);

    // altera número de itens no carrinho
    this.carrinhoService.emitirNumeroDeItens.subscribe(
      numeroItens => this.numeroItensCarrinho = numeroItens
    );

    this.afauth.auth.onAuthStateChanged(user => {
      this.userService.getUsuario(user.email).subscribe(usuario => {
        aux = usuario[0]

        var foto_user = document.querySelector(".login");
        if (aux.foto_perfil) {
          foto_user.setAttribute("style", `background-image:url(${aux.foto_perfil}); background-size:100%; background-repeat:no-repeat`)
        }else{
          foto_user.setAttribute("style", `background-image:url(../../assets/brasil.png); background-size:100%; background-repeat:no-repeat`)
        }
        this.enderecoEntrega = aux.endereco
        this.numeroEntrega = aux.numero

        this.carrinhoObservable = this.carrinhoService.getCarrinhoByEmail(user.email);
        this.carrinhoObservable.subscribe(car => {
          this.carrinho = car[0];
          if (this.carrinho != undefined && this.carrinho != null) {
            this.numeroItensCarrinho = this.carrinho.itens.length;
          }
        })


      })
    })
  }

  public pesquisa(termoDaBusca) {
    this.startAt.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.startAt.next('--------------------------------------');
  }

  public sair(): void {
    this.autenticacao.sair();
  }
}