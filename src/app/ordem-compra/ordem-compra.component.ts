import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import CarrinhoService from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model'
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';

//import {PagarMeCheckout} from https://assets.pagar.me/checkout/checkout.js;
import { pagarme } from '../../../node_modules/pagarme'


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

  public PagarMeCheckout: pagarme;

  

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService,
    private userService: UsuarioService,
    public afAuth: AngularFireAuth,

  ) { }

  public testpagarme(): void {
  console.log('vai abrir um modal')

  function handleSuccess (data) {
    console.log(data);
  }

  function handleError (data) {
    console.log(data);
  }

  var checkout = new this.PagarMeCheckout.Checkout({
    encryption_key: 'ek_test_O2HbYGEK5eWYnJi3odLXsOPaSSaTNm',
    success: handleSuccess,
    error: handleError
  });
  checkout.open({
    amount: 8000,
    createToken: 'true',
    paymentMethods: 'credit_card',
    customerData: false,
    customer: {
      external_id: '#123456789',
      name: 'Fulano',
      type: 'individual',
      country: 'br',
      email: 'fulano@email.com',
      documents: [
        {
          type: 'cpf',
          number: '71404665560',
        },
      ],
      phone_numbers: ['+5511999998888', '+5511888889999'],
      birthday: '1985-01-01',
    },
    billing: {
      name: 'Ciclano de Tal',
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Fulanos bairro',
        street: 'Rua dos fulanos',
        street_number: '123',
        zipcode: '05170060'
      }
    },
    shipping: {
      name: 'Ciclano de Tal',
      fee: 12345,
      delivery_date: '2017-12-25',
      expedited: true,
      address: {
        country: 'br',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Fulanos bairro',
        street: 'Rua dos fulanos',
        street_number: '123',
        zipcode: '05170060'
      }
    },
    items: [
      {
        id: '1',
        title: 'Bola de futebol',
        unit_price: 12000,
        quantity: 1,
        tangible: true
      },
      {
        id: 'a123',
        title: 'Caderno do Goku',
        unit_price: 3200,
        quantity: 3,
        tangible: true
      }
    ]
  })

  
  
 
          


  }


  evert
  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.userService.getEnderecoByUsuario(user.email).subscribe((usuario)=>{
        usuario.forEach(usuario =>{
          this.usuario = usuario
        })
     
      })
    })

    var button = document.querySelector('button') 
}


  public confirmarCompra(): void {
    console.log('entrou no confirmar')
    if (this.formulario.status === 'INVALID') {

      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()

    } else {

      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Você não selecionou nenhm item!')
        console.log('Você não selecionou nenhm item!')
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
            console.log('saiu no confirmar')
          })

      }
    }
  }
}
