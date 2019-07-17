import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import CarrinhoService from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model'
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  constructor(
    private userService: UsuarioService,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user.email)
      this.userService.getEnderecoByUsuario(user.email).subscribe((usuario)=>{
        // console.log(usuario.forEach())
      })
    })
  
  }
  public confirmarCompra(): void {

  }
}