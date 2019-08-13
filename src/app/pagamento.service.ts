import { Injectable } from '@angular/core';
import { Pagamento } from './shared/pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  
  pagarme = require('pagarme/browser')
  //api_key_teste2 = 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0';


  constructor() { }

  // Mostrar as transações realizadas
  // public mostrarTransferencias() {
  //   this.pagarme.client.connect({ api_key: this.api_key_teste })
  //     .then(client => {
  //       return client.transactions.all()
  //     })
  //     .then(console.log());
  // }

  // Criar uma transação simples
  public iniciarTransferencia(pagamento: Pagamento): Promise<any> {
    
    /* AJAX*/
return new Promise((resolve, reject) => {

  $.ajax({
    type:'GET',
    url:'https://gobag-delivery.firebaseio.com/chaves_API/api_key_teste.json',
    dataType:'json',
    cache: false,
    
  })  
  .done(function(api_key_teste) {
    
    console.log(api_key_teste);
    //$('#getResponse').html(JSON.stringify(api_key_teste)); // Trata a mensagem
    this.pagarme.client.connect({ api_key : api_key_teste })
    
    .then(client => client.transactions.create({
      
      capture: pagamento.capture,
      amount: Math.round(pagamento.amount * 100),
      card_number: pagamento.card_number,
      card_holder_name: pagamento.card_holder_name,
      card_expiration_date: pagamento.card_expiration_date,
      card_cvv: pagamento.card_cvv
      
    }))
    .then(console.log('Transação efetuada com sucesso!'));
  }) 
  console.log('AJAX')
  }
)}
} 
  


