import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Oferta } from './shared/oferta.model'

import { URL_API } from './app.api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
import { Pedido } from './shared/pedido.model';
import { EventEmitter } from 'events';

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas'

    //identifica o ID do último pedido no banco de dados
    private ultimoPedido: number = 7;

    constructor(private http: Http){}
    
    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => { return resposta.json() })
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0]
            })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao
            })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao
            })
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .retry(10)
            .map((resposta: Response) => resposta.json())

    }
    public getOfertasPorTendencia(tag: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?tags_like=${tag}`)
            .map((resposta: Response) => resposta.json())
    }

    public getOfertasPorAnunciante(anunciante: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?anunciante=${anunciante}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    // public getTamanhoDePedidos(): Promise<Pedido> {
    //     return this.http.get(`${URL_API}/pedidos`)
    //     .toPromise()
    //     .then((resposta: Response) => {
    //         return resposta.json().lastindex;
    //     })
    // }

    public getEnderecoDePedidos(): Promise<Pedido> {
        // let tamanhoPedidos: number = 7;
        return this.http.get(`${URL_API}/pedidos?id=${this.ultimoPedido}`)
            .toPromise()
            .then((resposta: Response) => {
                return (resposta.json()[0]);
            })
    }
    public getNumeroDePedidos(): Promise<Pedido> {
        // let tamanhoPedidos: number = 7;
        return this.http.get(`${URL_API}/pedidos?id=${this.ultimoPedido}`)
            .toPromise()
            .then((resposta: Response) => {
                return (resposta.json()[0]);
            })
    }
}