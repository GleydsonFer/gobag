import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import CarrinhoService from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model'
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  usuario:any
  public idPedidoCompra: number

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService,
    private userService: UsuarioService,
    private afAuth: AngularFireAuth,
    private toastr:ToastrService 
  ) { }
  evert
  ngOnInit() {

    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user.emailVerified)
      this.userService.getEnderecoByUsuario(user.email).subscribe((usuario)=>{
        usuario.forEach(usuario =>{
          this.usuario = usuario
        })
     
      })
    })

  }

  public confirmarCompra(): void {
    this.afAuth.auth.onAuthStateChanged(user=>{
      if (!user.emailVerified) {
        this.toastr.error("Verifica seu email e tente novamente.","Email ainda não verificado")
        console.log("email ainda não verificado!\n verifique seu email e tente novamente");
      }
    })
  
    if (this.formulario.status === 'INVALID') {

      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()

    } else {

      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Você não selecionou nenhm item!')
      } else {

        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
        )


        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {
            this.idPedidoCompra = idPedido
            this.carrinhoService.limparCarrinho()

          })

      }
    }
  }

}