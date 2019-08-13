import { AngularFireAuth } from '@angular/fire/auth';
import { PedidoService } from './../pedido.service';
import { DevolucaoService } from './../devolucao.service';
import { ItemCarrinho } from 'src/app/shared/item-carrinho.model';
import {CarrinhoService} from '../carrinho.service';

import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-ordem-devolucao',
  templateUrl: './ordem-devolucao.component.html',
  styleUrls: ['./ordem-devolucao.component.css']
})
export class OrdemDevolucaoComponent implements OnInit {

  constructor(
    private carrinhoService: CarrinhoService,
    private devolucao: DevolucaoService,
    private pedidoService: PedidoService,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit() { }

  confirmarDevolucao() {
    
    this.devolucao.itensConfirmados = []

    this.devolucao.pedido.forEach(item => {
      if (item.quantidade > 0) {
        this.devolucao.itensConfirmados.push(item)
        console.log("infelizmente entrou no if")
      }
    })

    console.log("itens confirmados")
    console.log(this.devolucao.itensConfirmados)
    console.log("itens devolvidos")
    console.log(this.devolucao.carrinhoDevol)
    

    this.pedidoService.setConfirmados(this.devolucao.itensConfirmados)
    this.pedidoService.setDevolvidos(this.devolucao.carrinhoDevol)
    
  }
  
}
