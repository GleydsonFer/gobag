import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Autenticacao } from '../autenticacao.service'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

import '../util/rxjs-extensions'

@Component({
  selector: 'app-topo-logado',
  templateUrl: './topo-logado.component.html',
  styleUrls: ['./topo-logado.component.css'],
  providers: [ OfertasService ]
})
export class TopoLogadoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()
  
  constructor(
    private ofertasService: OfertasService,
    private autenticacao: Autenticacao
    ) { }

    ngOnInit() {
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

    public sair(): void {
      this.autenticacao.sair()
    }
  
  

}
