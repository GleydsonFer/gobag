import { ItemCarrinho } from './item-carrinho.model'

export class Pedido {
    constructor(
        public email_cliente: string,
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaPagamento: string,
        public data: Date,
        // recebe: 'processando', 'experimentando' , 'finalizada', 'cancelada'
        public status: string,
        public itens: Array <ItemCarrinho>,
        public valor_total: number,
        public desconto?: number
    ) {  }
}