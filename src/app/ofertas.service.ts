import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { URL_API } from './app.api';
import { Oferta } from './shared/oferta.model';
import { Pedido } from './shared/pedido.model';
import { pipe } from 'rxjs';
import { Produto } from './shared/produto.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseListObservable } from "@angular/fire/database-deprecated";

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas'

    //identifica o ID do último pedido no banco de dados
    private ultimoPedido: number = 7;

    // referência à coleção 'produtos do firestore
    // private refProdutos = firebase.firestore().collection('produtos');

    constructor(
        private http: Http,
        private db: AngularFirestore,
        private storage: AngularFireStorage
    ) { }

    // Métodos para API fake

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => { return resposta.json() })
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
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

    public getOfertasPorAnunciante(anunciante: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?anunciante=${anunciante}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

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

    /**
     * Métodos para o Firebase
     */

    // retorna todos os produtos do banco
    public getAllProdutos() {
        return this.db.collection('produtos')
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
                })
            );
    }

    // retorna um produto do banco
    public getProdutoByID(id: number) {
        return this.db.collection('produtos', ref => ref.where('id_produto', '==', id))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
                })
            );
    }

    // retorna os produtos por categoria
    public getProdutosByCategorias(categoria: string) {
        return this.db.collection('produtos', ref => ref.where('categoria', '==', categoria.toLowerCase()))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
                })
            );
    }

    // retorna os produtos por loja
    public getProdutosByLojas(loja: string) {
        return this.db.collection('produtos', ref => ref.where('loja', '==', loja.toLowerCase()))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
                })
            );
    }

    // retorna os produtos por nome 
    public pesquisaProdutos(searchValue: string) {

        return this.db.collection('produtos', ref =>
            ref
                .orderBy('nome')
                .startAt(searchValue.toLowerCase())
                .endAt(searchValue.toLowerCase()+"\uf8ff")
                .limit(5))
                .valueChanges();
    }

    public setProduto(produto: Produto, imagens: any) {

        console.log("analizar produto \n" + produto.categoria)

        // Id único que servirá tanto para o firestore quanto para o storage
        let fireUID = '';
        let stringImagens: Array<string> = [];

        // adiciono os produtos sem o campo de imagens no firestore,
        this.db.collection('produtos').add(produto).then(user => {

            // id único do produto é adicionado a variável para referenciar a pasta no storage
            fireUID = user.id;
            console.log('Produto adiconado com sucesso', produto);

            // percorre todas as imagens inseridas e faz o upload para o Storage do Firebase
            for (let i = 0; i < imagens.length; i++) {
                let imagePath = `produtos/${fireUID}/img${i}`;

                // adiciona todas as imagens no storage, com a referencia do produto,
                this.storage.upload(imagePath, imagens[i]).then(() => {
                    console.log('Imagem adicionada com sucesso!');

                    // recupera o getDownloadURL de cada imagem e adiciona ao array de strings,
                    this.storage.ref(imagePath).getDownloadURL().subscribe(url => {
                        stringImagens.push(url);
                        produto.imagens = stringImagens;

                        // atualiza o produto no banco, o campo de imagens com seus respectivos links para download 
                        this.db.collection('produtos').doc(fireUID).update(produto);
                    })
                });
            }
        })


     }

}