
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from './shared/pedido.model';
import { ListaDePedidos } from './shared/lista-de-pedidos.model';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {

    constructor(
        private afs: AngularFirestore
    ) { }

    public efetivarCompra(pedido: ListaDePedidos): Promise<any> {

        return this.afs.collection('pedidos')
            .doc(btoa(pedido.email_cliente)).set({ 'email': pedido.email_cliente })
            .then(doc => {
                return this.afs.collection('pedidos')
                    .doc(btoa(pedido.email_cliente))
                    .collection('lista_pedidos')
                    .add({ ...pedido })
                    .then();
            })
    }
}