import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { AutenticacaoGuard } from '../autenticacao-guard.service'

import '../util/rxjs-extensions'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { ActivatedRoute, Params } from '@angular/router';
import CarrinhoService from '../carrinho.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public numeroItensCarrinho: number;
  private subjectPesquisa: Subject<string> = new Subject<string>()
  public naoLogado = this.autenticacaoGuard.canActivate();
  produtos: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(
    private ofertasService: OfertasService,
    private autenticacaoGuard : AutenticacaoGuard,
    private carrinhoService: CarrinhoService
    ) { }
  

  ngOnInit() {

    this.produtos = this.ofertasService.pesquisaProdutos(this.startAt);

    //mostrar número de itens no carrinho
    this.carrinhoService.emitirNumeroDeItens.subscribe(
      numeroItens => this.numeroItensCarrinho = numeroItens
    );

  }

  public pesquisa(termoDaBusca) {
    this.startAt.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.startAt.next('--------------------------------------');
  }

 
  





}
