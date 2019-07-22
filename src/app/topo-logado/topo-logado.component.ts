import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


import { Autenticacao } from '../autenticacao.service'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

import '../util/rxjs-extensions'
import CarrinhoService from '../carrinho.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-topo-logado',
  templateUrl: './topo-logado.component.html',
  styleUrls: ['./topo-logado.component.css'],
  providers: [OfertasService]
})
export class TopoLogadoComponent implements OnInit {

  public enderecoEntrega: string;
  public numeroEntrega: string;
  public numeroItensCarrinho: number;

 
  


  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    private ofertasService: OfertasService,
    private autenticacao: Autenticacao,
    private carrinhoService: CarrinhoService,
    private db: AngularFirestore,
    public afauth: AngularFireAuth,
    public userService: UsuarioService
  ) { }

  ngOnInit() {
    var aux
    var endereco
    var numero
    
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .debounceTime(1000) //executa a ação do switchMap após 1 segundo
      .distinctUntilChanged() //para fazer pesquisas distintas
      .switchMap((termo: string) => {
        if (termo.trim() === '') {
          //retornar um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
        return Observable.of<Oferta[]>([])
      })

    //Puxa o endereço de entrega do banco de dados
    this.ofertasService.getEnderecoDePedidos().then((resp) => {
      this.enderecoEntrega = resp.endereco;
    })
    //Puxa o número da casa de entrega do banco de dados
    this.ofertasService.getNumeroDePedidos().then((resp) => {
      this.numeroEntrega = resp.numero;
    })

    //mostrar número de itens no carrinho
    this.carrinhoService.emitirNumeroDeItens.subscribe(
      numeroItens => this.numeroItensCarrinho = numeroItens
    );

    this.afauth.auth.onAuthStateChanged (user => {
      
      this.userService.getEnderecoByUsuario (user.email).subscribe(usuario =>{
        
        aux = usuario[0]
        this.enderecoEntrega = aux.endereco
        this.numeroEntrega = aux.numero        
      })
    })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

  public sair(): void {
    this.autenticacao.sair()
  }
}








