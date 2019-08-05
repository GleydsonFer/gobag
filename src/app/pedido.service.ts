import { Pedido } from './shared/pedido.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private authFire: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  getPedidos(email) {
    return this.afs.collection("pedidos", ref => ref.orderBy('data') && ref.where('email_cliente', '==', email)).snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ "key": c.payload.doc.id, ...c.payload.doc.data() }));
      })
    )
  }
  setConfirmados(confirmados) {
    this.afs.collection('pedidos').doc('1vDfiKkuDeA4bs6u7vq3').update({
      "confirmados":confirmados
    })
  }

  setDevolvidos(devolvidos) {
     this.afs.collection('pedidos').doc('1vDfiKkuDeA4bs6u7vq3').update({
       "devolvidos":devolvidos
     })
 
  }

  public efetivarCompra(pedido: Pedido): Promise<string> {

    console.log(pedido);
    return this.afs.collection('pedidos').add({ ...pedido }).then(pedido => {
      return pedido.id;
    })
  }
}
