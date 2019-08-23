import { ListaDePedidos } from './lista-de-pedidos.model';

export class Pedido {
    constructor(
        public email_cliente: string,
        public listaPedidos: ListaDePedidos
    ) {  }
}