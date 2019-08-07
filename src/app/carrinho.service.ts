import { EventEmitter, Injectable } from '@angular/core';
import { ItemCarrinho } from './shared/item-carrinho.model';
import { Produto } from './shared/produto.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Carrinho } from './shared/carrinho.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from './shared/usuario.model';
import { JsonPipe } from '@angular/common';

@Injectable()
class CarrinhoService {
    teste: any[] = [];
    itens: ItemCarrinho[] = [];
    carrinho: Carrinho;
    emitirNumeroDeItens: EventEmitter<number> = new EventEmitter<number>();
    carrinhoObservable: Observable<any>;
    carrinhoObservable2: Observable<any>;
    usuario: any;

    constructor(
        private afs: AngularFirestore,
        private afauth: AngularFireAuth
    ) {
        this.carrinho = {
            email: '',
            itens: [],
            valor_total: 0
        }

        this.afauth.auth.onAuthStateChanged(user => {
            this.usuario = user;
            this.getCarrinhoByEmail(user.email)
                .subscribe((car: any) => {
                    this.carrinho = car[0];
                    if (car.email == user.email) {
                        car.forEach((element: any) => {
                            this.itens = element.itens
                        })
                    }
                })
        })
    }

    public incluirItem(produto: Produto, user: firebase.User) {


        // Prepara o produto que será adicionado ao carrinho
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            produto.id_produto,
            produto.imagens[0],
            produto.nome,
            produto.descricao,
            produto.loja,
            produto.valor,
            1,
            produto.tamanho
        )

        console.log(this.carrinho);
        console.log(user.email);
        //verificar se o item em questão já não existe dentro de this.itens
        var itemCarrinhoEncontrado = this.carrinho.itens.find((item: ItemCarrinho) => ((item.tamanho == itemCarrinho.tamanho) && (item.id_produto === itemCarrinho.id_produto)))

        if (itemCarrinhoEncontrado) {
            //incrementar quantidade
            console.log(this.carrinho);
            this.carrinho.itens[this.carrinho.itens.indexOf(itemCarrinhoEncontrado)].quantidade = ++itemCarrinho.quantidade;
            this.carrinho.valor_total = this.totalCarrinhoCompras();
            this.afs.collection('carrinhos').doc(btoa(user.email)).update({ ...this.carrinho });

        } else {
            this.carrinho.itens.push(itemCarrinho);
            this.emitirNumeroDeItens.emit(this.carrinho.itens.length);

            console.log(this.carrinho);

            this.afs.collection('carrinhos').doc(btoa(user.email)).set({
                "email": user.email,
                "itens": this.carrinho.itens.map((obj) => { return Object.assign({}, obj) }),
                "valor_total": this.totalCarrinhoCompras()
            })
        }
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0;

        this.carrinho.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade)
        })
        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho, index: number): void {

        //incrementar quantidade
        console.log(this.carrinho);
        this.carrinho.itens[index].quantidade = ++itemCarrinho.quantidade;
        this.carrinho.valor_total = this.totalCarrinhoCompras();
        this.afs.collection('carrinhos').doc(btoa(this.carrinho.email)).update({ ...this.carrinho });
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho, index: number) {
        //decrementar quantidade
        console.log(this.carrinho);
        this.carrinho.itens[index].quantidade = --itemCarrinho.quantidade;

        if (this.carrinho.itens[index].quantidade === 0) {
            this.carrinho.itens.splice(index, 1);
            this.emitirNumeroDeItens.emit(this.carrinho.itens.length);
        }
        this.carrinho.valor_total = this.totalCarrinhoCompras();
        this.afs.collection('carrinhos').doc(btoa(this.carrinho.email)).update({ ...this.carrinho });

    }

    public limparCarrinho(usuario: Usuario, carrinho: Carrinho) {

        console.log('carrinho', carrinho);

        var fireUID = btoa(usuario.email);

        this.afs.collection('carrinhos').doc(fireUID).delete().then(() => {
            this.emitirNumeroDeItens.emit(0);
        })
    }

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public getCarrinhoByEmail(email: string) {
        return this.afs.collection('carrinhos', ref => ref.where('email', '==', email))
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(c => ({ ...c.payload.doc.data() }));
                })
            );
    }

}

export default CarrinhoService