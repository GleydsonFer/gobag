import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-topo-logado',
  templateUrl: './topo-logado.component.html',
  styleUrls: ['./topo-logado.component.css'],
  providers: [OfertasService]
})
export class TopoLogadoComponent implements OnInit {

  public usuario: any
  public enderecoEntrega: string;
  public numeroEntrega: string;
  public numeroItensCarrinho: number;
  public widthScreen: boolean = true;
  mostraListaDePesquisa: boolean = false;
  inputPesquisa: any;

  produtos: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(
    private ofertasService: OfertasService,
    private autenticacao: Autenticacao,
    private carrinhoService: CarrinhoService,
    private db: AngularFirestore,
    public afauth: AngularFireAuth,
    public userService: UsuarioService
  ) { }

  ngAfterViewInit(): void {
    this.resize()
  }
  
  resize(){
    if(screen.width > 820){
      this.widthScreen = true
    } else {
      this.widthScreen = false
    }
  }
  ngOnInit() {
    var aux

    this.produtos = this.ofertasService.pesquisaProdutos(this.startAt);

    this.produtos.subscribe(prods => {
      console.log(prods);
    })

    this.inputPesquisa = document.querySelector('#termoDaPesquisa');

    // mostrar número de itens no carrinho
    this.carrinhoService.emitirNumeroDeItens.subscribe(
      numeroItens => this.numeroItensCarrinho = numeroItens
    );

    this.afauth.auth.onAuthStateChanged(user => {

      this.userService.getEnderecoByUsuario(user.email).subscribe(usuario => {
       
        aux = usuario[0]

        var foto_user = document.querySelector(".login")
        foto_user.setAttribute("style" , `background-image:url(${aux.foto_perfil}); background-size:100%; background-repeat:no-repeat`)

        this.enderecoEntrega = aux.endereco
        this.numeroEntrega = aux.numero
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