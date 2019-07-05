import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { AutenticacaoGuard } from '../autenticacao-guard.service'

import '../util/rxjs-extensions'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { ActivatedRoute, Params } from '@angular/router';
import CarrinhoService from '../carrinho.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  /* VAI TER Q TER NO TOPO-LOGADO */
  // public enderecoEntrega: string;
  // public numeroEntrega: string;
  public numeroItensCarrinho: number;

  private subjectPesquisa: Subject<string> = new Subject<string>()

  public naoLogado = this.autenticacaoGuard.canActivate();


  

  constructor(
    private ofertasService: OfertasService,
    private autenticacaoGuard : AutenticacaoGuard,
    private carrinhoService: CarrinhoService
    ) { }
  

  ngOnInit() {

    //Puxa o endereço de entrega do banco de dados
    // this.route.parent.params.subscribe((parametros: Params) => {
    //   this.ofertasService.getEnderecoDePedidos(parametros.id)
    //     .then((endereco: string) => { 
    //       this.enderecoEntrega = endereco;
    //     })
    // })

    /* VAI TER Q TER NO TOPO-LOGADO 
    this.ofertasService.getEnderecoDePedidos().then((resp) => {
      this.enderecoEntrega = resp.endereco;
    })
    this.ofertasService.getNumeroDePedidos().then((resp) => {
      this.numeroEntrega = resp.numero;
    })
    */

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

    //mostrar número de itens no carrinho
    this.carrinhoService.emitirNumeroDeItens.subscribe(
      numeroItens => this.numeroItensCarrinho = numeroItens
    );

  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }


 
  





}
