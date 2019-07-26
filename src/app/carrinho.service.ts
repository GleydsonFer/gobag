import { EventEmitter } from '@angular/core';
import { ItemCarrinho } from './shared/item-carrinho.model';
import { Produto } from './shared/produto.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = []
    public emitirNumeroDeItens: EventEmitter<number> = new EventEmitter<number>();

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(produto: Produto): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            produto.id_produto,
            produto.imagens[0],
            produto.nome,
            produto.descricao,
            produto.valor,
            1
        )

        //verificar se o item em questão já não existe dentro de this.itens
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        } else {
            this.itens.push(itemCarrinho);
            this.emitirNumeroDeItens.emit(this.itens.length);
        }
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade)
        })

        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {

        //incrementar quantidade
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        //decrementar quantidade
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade -= 1

            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
                this.emitirNumeroDeItens.emit(this.itens.length);
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = []
    }

}

export default CarrinhoService