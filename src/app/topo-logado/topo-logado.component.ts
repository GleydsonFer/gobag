import { Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Autenticacao } from '../autenticacao.service';
import { CarrinhoService } from '../carrinho.service';
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

  }
  ngOnInit() {
    var aux

    this.produtos = this.ofertasService.pesquisaProdutos(this.startAt);

    // altera número de itens no carrinho
    this.carrinhoService.emitirNumeroDeItens.subscribe(
      numeroItens => this.numeroItensCarrinho = numeroItens
    );

    this.afauth.auth.onAuthStateChanged(user => {
      this.userService.getUsuario(user.uid).then(usuario => {
        const fotoUser = document.querySelector('.login');
        if (usuario.foto_perfil) {
          fotoUser.setAttribute('style', `background-image:url(${usuario.foto_perfil});
            background-size:100%; background-repeat:no-repeat`);
        } else {
          fotoUser.setAttribute('style', `background-image:url(../../assets/brasil.png);
            background-size:100%; background-repeat:no-repeat`);
        }
        this.enderecoEntrega = usuario.endereco;
        this.numeroEntrega = usuario.numero;

        this.carrinhoObservable = this.carrinhoService.getCarrinhoByEmail(user.email);
        this.carrinhoObservable.subscribe(car => {
          this.carrinho = car[0];
          if (this.carrinho !== undefined && this.carrinho != null) {
            this.numeroItensCarrinho = this.carrinho.itens.length;
          }
        });
      });
    });
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