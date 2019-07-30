import { Component, OnInit } from '@angular/core';
import pagarme from 'pagarme/browser';

@Component({
  selector: 'app-ordem-pagamento',
  templateUrl: './ordem-pagamento.component.html',
  styleUrls: ['./ordem-pagamento.component.css']
})
export class OrdemPagamentoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  transacao() {
    pagarme.client.connect({ api_key: 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0' })
      .then(client => client.transactions.all())
      .then(transactions => console.log(transactions))
  }

}
