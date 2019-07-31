import { ItemCarrinho } from './item-carrinho.model';

export class Carrinho{
    email: string;
    itens : Array<ItemCarrinho>;
    valor_total: number
}