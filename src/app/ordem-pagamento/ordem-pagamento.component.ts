import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-pagamento',
  templateUrl: './ordem-pagamento.component.html',
  styleUrls: ['./ordem-pagamento.component.css']
})
export class OrdemPagamentoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const pagarme = require('pagarme/browser');
    pagarme.checkout.open();
    pagarme.client.connect({ api_key: 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0' })
    // Mostra as tranferências já realizadas
    .then(client => client.transactions.all())
    .then(transactions => console.log(transactions))
    .catch(error => console.log(error))

  }

}
