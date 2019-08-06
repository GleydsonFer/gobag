import { OrdemCompraService } from '../ordem-compra.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import CarrinhoService from '../carrinho.service';
import { Pedido } from '../shared/pedido.model';
import { UsuarioService } from './../usuario.service';
import { FormGroup, FormBuilder } from '@angular/forms';


//import {PagarMeCheckout} from https://assets.pagar.me/checkout/checkout.js;
// import { pagarme } from '../../../node_modules/pagarme'

import { Carrinho } from '../shared/carrinho.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers:[OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public usuario: any;
  public idPedidoCompra: string;
  public formularioCartao : FormGroup;
  public dadosCartao: any;
  carrinhoObservable: Observable<any>;
  carrinho: Carrinho;

  // public PagarMeCheckout: pagarme;

  constructor(
    
    private carrinhoService: CarrinhoService,
    private userService: UsuarioService,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private ordemCompraService : OrdemCompraService,
  ) { }
  

  ngOnInit() {

    this.formularioCartao = this.formBuilder.group({
      card_number : [],
      card_holder_name:[],
      card_expiration_date:[],
      card_cvv:[],
    })

  /************************************* */
  /************************************* */
  /************************************* */
  /*************** PAGARME ************* */
  /************************************* */
  /************************************* */
  /************************************* */
  /************************************* */

    //const pagarme = require('pagarme/browser')

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
          console.log('ngOnInit', this.carrinho);
        })
      })
    })
    
  
  }

  // comunicacao-pagarme

  public executa(pedido:Pedido) : void {

    

    console.log(pedido)

    
    
    const pagarme = require ('pagarme/browser' )
    pagarme.client.connect({ api_key: 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0' })
    // //     // Mostrar as transações realizadas
    // //     //   .then(client => {
    // //     //     return client.transactions.all()
    // //     //   })
    // //     //   .then(console.log);
    //     // Criar uma transação simples
        .then(client => client.transactions.create({
            capture: 'false',
            amount: <number>pedido.valor_total * 100,
            card_number: this.dadosCartao.card_number,
            card_holder_name: this.dadosCartao.card_holder_name,
            card_expiration_date: this.dadosCartao.card_expiration_date,
            card_cvv: this.dadosCartao.card_cvv,
        })).then(console.log('Transação efetuada com sucesso!'));
        console.log(this.formularioCartao)  
  }

  public salvarDadosCartao(): void {

     this.dadosCartao = this.formularioCartao.value
     //criar 'pedido' para mandar por parametro

     let pedido: Pedido = new Pedido(
        
      // email
      this.usuario.email,
      // endereco
      this.usuario.endereco,
      // numero 
      this.usuario.numero,
      // complemento
      this.usuario.complemento,
      // forma de pagamento
      '',
      // data do pedido
      new Date(Date.now()),
      // status
      'processando',
      // itens do carrinho
      this.carrinhoService.exibirItens().map((obj)=> {return Object.assign({}, obj)}),
      // valor total
      this.carrinhoService.totalCarrinhoCompras(),
      // desconto?
      0
    );
     this.confirmarCompra(pedido)
     this.executa(pedido)
  }
  
  /************************************* */
  /************************************* */
  /************************************* */
  /*************** PAGARME ************* */
  /************************************* */
  /************************************* */
  /************************************* */
  /************************************* */

  public confirmarCompra(pedido:Pedido): void {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (!user.emailVerified) {
        this.toastr.error("Verifica seu email e tente novamente.", "Email ainda não verificado")
        console.log("email ainda não verificado!\n verifique seu email e tente novamente");
      } else {

        if (this.carrinhoService.exibirItens().length === 0) {
          alert('Você não selecionou nenhm item!')
        } else {

      

          this.ordemCompraService.efetivarCompra(pedido)
            .then((idPedido: string) => {
              this.idPedidoCompra = idPedido;
              // this.carrinhoService.limparCarrinho();
              this.toastr.success('Pedido feito com sucesso', 'Compra');
            })
        }
      }
    })
  }

  public cancelarCarrinho(){
    // this.carrinhoService.limparCarrinho(this.usuario, this.carrinho);
    // this.carrinho = null;
  }
  
}