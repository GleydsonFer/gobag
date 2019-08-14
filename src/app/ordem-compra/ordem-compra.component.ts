import { Router } from '@angular/router';
import { AutenticacaoGuard } from './../autenticacao-guard.service';
import { OrdemCompraService } from '../ordem-compra.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { CarrinhoService } from '../carrinho.service';
import { Pedido } from '../shared/pedido.model';
import { UsuarioService } from './../usuario.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


// import {PagarMeCheckout} from https://assets.pagar.me/checkout/checkout.js;
// import { pagarme } from '../../../node_modules/pagarme'

import { Carrinho } from '../shared/carrinho.model';
import { Observable } from 'rxjs';
import { Pagamento } from '../shared/pagamento.model';
import { PagamentoService } from '../pagamento.service';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  usuario: any;
  idPedidoCompra: string;
  formularioCartao: FormGroup;
  dadosCartao: any;
  carrinhoObservable: Observable<any>;
  carrinho: Carrinho;
  pagamento: Pagamento;
  dados_pagamento: FormGroup = new FormGroup({
    'card_number': new FormControl('', [Validators.required, Validators.minLength(19)]),
    'card_holder_name': new FormControl('', [Validators.required]),
    'card_expiration_date': new FormControl('', [Validators.required, Validators.minLength(5)]),
    'card_cvv': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'card_cpf': new FormControl('', [Validators.required, Validators.minLength(14)])
  })

  constructor(
    private carrinhoService: CarrinhoService,
    private userService: UsuarioService,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private ordemCompraService: OrdemCompraService,
    private autenticacaoGuard: AutenticacaoGuard,
    private Router: Router,
    private pagamentoService: PagamentoService
  ) {

    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user.emailVerified)
      this.userService.getUsuario(user.email).subscribe((usuario) => {
        usuario.forEach(usuario => {
          this.usuario = usuario
        })
        // recupera  carrinho a partir do banco de dados
        this.carrinhoObservable = this.carrinhoService.getCarrinhoByEmail(user.email);
        this.carrinhoObservable.subscribe(car => {
          this.carrinho = car[0];
        })
      })
    })
  }

  ngOnInit() {
    if (!this.autenticacaoGuard.canActivateVerOfertaNaoLogado()) {
      this.Router.navigate(['/acesso'])
    }
  }

  // CONFIRMAÇÃO DO PEDIDO DE COMPRA
  public confirmarCompra() {

    this.dados_pagamento.get('card_number').markAsTouched()
    this.dados_pagamento.get('card_holder_name').markAsTouched()
    this.dados_pagamento.get('card_expiration_date').markAsTouched()
    this.dados_pagamento.get('card_cvv').markAsTouched()
    this.dados_pagamento.get('card_cpf').markAsTouched()

    // criar 'pedido' com os dados da compra e do cliente
    let pedido: Pedido = new Pedido(
      this.usuario.email, // email
      this.usuario.endereco, // endereco
      this.usuario.numero, // numero 
      this.usuario.complemento, // complemento
      '', // forma de pagamento
      new Date(Date.now()), // data do pedido
      'processando', // status
      this.carrinhoService.exibirItens().map((obj) => { return Object.assign({}, obj) }), // itens do carrinho
      this.carrinhoService.totalCarrinhoCompras(), // valor total
      0 // desconto?
    );

    this.pagamento = new Pagamento(); // Inicia o objeto pagamento

    // verifica se os campos de pagamento são inválidos
    if (this.dados_pagamento.status == "INVALID") {

      this.toastr.info('Preencha os campos de pagamento para finalizar a compra!');

    } else { // entra aqui se os campos de pagamento estiverem OK

      // Se os campos preenchidos estiverem validados, então são passados para o objeto pagamento
      this.pagamento = {
        amount: pedido.valor_total,
        capture: 'false', // inicia toda transação com a captura como falso
        card_cvv: this.dados_pagamento.value.card_cvv.replace(/[^0-9]/g, ''),
        card_expiration_date: this.dados_pagamento.value.card_expiration_date.replace(/[^0-9]/g, ''),
        card_holder_name: this.dados_pagamento.value.card_holder_name,
        card_number: this.dados_pagamento.value.card_number.replace(/[^0-9]/g, '')
      }

      /*************** PAGARME ************* */
      this.pagamentoService.iniciarTransferencia(this.pagamento).then(resp => {

        // if (!this.usuario.emailVerified) { // verifica se o email está verificado
        //   this.toastr.error("Verifica seu email e tente novamente.", "Email ainda não verificado")
        //   console.log("email ainda não verificado!\n verifique seu email e tente novamente");
        // } else {
        if (this.carrinho.itens.length === 0) { // verifica se o carrinho está vazio no momento da confirmação
          alert('Você não selecionou nenhum item!');
        } else {
          this.ordemCompraService.efetivarCompra(pedido) // efetiva a compra no banco de dados
            .then((idPedido: string) => {
              this.idPedidoCompra = idPedido;
              // this.cancelarCarrinho(); // limpa o carrinho depois da compra finalizada
              this.toastr.success('Pedido feito com sucesso', 'Compra'); // confirma e a compra
            })
        } // fim if else para verificar se o carrinho está vazio
        // } // fim if else do email não vereficado
      });
    } // fim if else dos campos de pagamento
  } //fim confirmarCompra()

  // limpa o carrinho do cliente no banco de dados
  public cancelarCarrinho() {
    this.carrinhoService.limparCarrinho(this.usuario, this.carrinho);
    this.carrinho = null;
  }

  updateFieldValue(campo, value) {
    this.dados_pagamento.controls[campo].setValue(value)
    this.dados_pagamento.controls[campo].markAsTouched()
  }


  aplicaCssErro(campo) {
    return { 'is-invalid': this.dados_pagamento.get(campo).invalid && this.dados_pagamento.get(campo).touched }
  }

}