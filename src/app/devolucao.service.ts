import { Pedido } from './shared/pedido.model';
import { ItemCarrinho } from 'src/app/shared/item-carrinho.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevolucaoService {

  public pedido: ItemCarrinho[] = []
  public carrinhoDevol: ItemCarrinho[] = []
  public itensConfirmados: ItemCarrinho[] = []

  constructor() { }


}
