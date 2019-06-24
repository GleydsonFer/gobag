import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import '../util/rxjs-extensions'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public enderecoEntrega: string;
  public numeroEntrega: string;
  
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    private ofertasService: OfertasService,
  ) {}

  ngOnInit() {

    //Puxa o endereço de entrega do banco de dados
    // this.route.parent.params.subscribe((parametros: Params) => {
    //   this.ofertasService.getEnderecoDePedidos(parametros.id)
    //     .then((endereco: string) => { 
    //       this.enderecoEntrega = endereco;
    //     })
    // })
    
    this.ofertasService.getEnderecoDePedidos().then((resp) => {
      this.enderecoEntrega = resp.endereco;
    })
    this.ofertasService.getNumeroDePedidos().then((resp) => {
      this.numeroEntrega = resp.numero;
    })
    
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .debounceTime(1000) //executa a ação do switchMap após 1 segundo
      .distinctUntilChanged() //para fazer pesquisas distintas
      .switchMap((termo: string) => {
        if(termo.trim() === ''){
          //retornar um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
        return Observable.of<Oferta[]>([])
      })

  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

}
