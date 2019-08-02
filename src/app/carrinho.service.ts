import { EventEmitter, Injectable } from '@angular/core';
import { ItemCarrinho } from './shared/item-carrinho.model';
import { Produto } from './shared/produto.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Carrinho } from './shared/carrinho.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from './shared/usuario.model';

@Injectable()
class CarrinhoService {

    carrinho: Carrinho;
    itens: ItemCarrinho[] = []
    emitirNumeroDeItens: EventEmitter<number> = new EventEmitter<number>();
    carrinhoObservable: Observable<any>;
    carrinhoObservable2: Observable<any>;

    constructor(
        private afs: AngularFirestore,
        private afauth: AngularFireAuth
    ) { }

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(produto: Produto): void {

        this.afauth.auth.onAuthStateChanged(user => {
            var fireUID = btoa(user.email);

            this.carrinhoObservable = this.getCarrinhoByEmail(user.email);
            this.carrinhoObservable.subscribe(car => {
                if(car[0] != undefined){
                    this.itens = car[0].itens;
                } else {
                    this.itens = [];
                }

                let itemCarrinho: ItemCarrinho = new ItemCarrinho(
                    produto.id_produto,
                    produto.imagens[0],
                    produto.nome,
                    produto.descricao,
                    produto.loja,
                    produto.valor,
                    1
                )

                //verificar se o item em questão já não existe dentro de this.itens
                let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id_produto === itemCarrinho.id_produto)

                if (itemCarrinhoEncontrado) {
                    itemCarrinhoEncontrado.quantidade += 1
                } else {

                    this.itens.push(itemCarrinho);
                    this.carrinho = {
                        email: user.email,
                        itens: this.itens.map((obj) => { return Object.assign({}, obj) }),
                        valor_total: this.totalCarrinhoCompras()
                    }
                    this.afs.collection('carrinhos').doc(fireUID).set(this.carrinho).then(() => {
                        this.emitirNumeroDeItens.emit(this.carrinho.itens.length);
                    });
                }
            })
        })
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0;

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade)
        })

        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {

        //incrementar quantidade
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id_produto === itemCarrinho.id_produto);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        //decrementar quantidade
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id_produto === itemCarrinho.id_produto)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade -= 1

            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
                this.emitirNumeroDeItens.emit(this.itens.length);
            }
        }
    }

    public limparCarrinho(usuario: Usuario, carrinho: Carrinho) {
        this.itens = [];

        console.log('carrinho', carrinho);

        var fireUID = btoa(usuario.email);

        
        this.afs.collection('carrinhos').doc(fireUID).delete().then(() => {
            this.emitirNumeroDeItens.emit(0);
            carrinho.itens = [];
            carrinho.valor_total = 0;
            console.log('carrinho limpo', carrinho);
            return carrinho;
        })
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