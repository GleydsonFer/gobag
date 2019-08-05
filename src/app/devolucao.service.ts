import { AngularFireAuth } from '@angular/fire/auth';
import { Pedido } from './shared/pedido.model';
import { ItemCarrinho } from 'src/app/shared/item-carrinho.model';
import { Injectable } from '@angular/core';
import { PedidoService } from './pedido.service';

@Injectable({
  providedIn: 'root'
})
export class DevolucaoService {

  public pedido: ItemCarrinho[] = []
  public carrinhoDevol: ItemCarrinho[] = []
  public itensConfirmados: ItemCarrinho[] = []
  public keyPedido:string = ''

  constructor(
    private pedidoService: PedidoService,
    private fireAuth: AngularFireAuth
  ) { }


  pedidoAtual(): Promise<any> {
    return new Promise(resolve => {
      this.fireAuth.auth.onAuthStateChanged(user => {
        this.pedidoService.getPedidos(user.email).subscribe(retorno => {
        
          retorno.forEach((item: any, index) => {
            if (index == 0) {
              this.keyPedido = item.key
              this.pedido = item.itens
              resolve(item.itens)
            }
          })
        })
      })
    })
  }

  
  confirmados(ItensPedido) {
    this.pedidoService.setConfirmados(ItensPedido)
  }

  devolvidos(ItensPedido) {
    this.pedidoService.setDevolvidos(ItensPedido)
  }



}
