import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedido } from './shared/pedido.model';

@Injectable()
export class OrdemCompraService {

    constructor(
        private afs: AngularFirestore
    ) {}

    public efetivarCompra(pedido: Pedido): Promise<string>{

        console.log(pedido);
        return this.afs.collection('pedidos').add({...pedido}).then(pedido => {
            return pedido.id;
        })

    }
}