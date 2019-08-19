import { Injectable } from '@angular/core';
import { Pagamento } from './shared/pagamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  
  private pagarme = require('pagarme/browser')
  private api_key_teste = 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0';

  constructor(
    private http: HttpClient
  ) { }

  // Teste de comunicação com o back-end
  // FUNCIONANDO
  public helloWorld(){
    return this.http.get('https://us-central1-gobag-delivery.cloudfunctions.net/helloWorld', {responseType: 'text'});
  }

  // Mostrar as transações realizadas
  public mostrarTransferencias() {
    return this.http.get('https://us-central1-gobag-delivery.cloudfunctions.net/mostrarTransferencias')
  }

  // Criar uma transação simples
  public iniciarTransferencia(pagamento: Pagamento): Promise<any> {
    return this.pagarme.client.connect({ api_key: this.api_key_teste })
      .then(client => client.transactions.create({
        capture: pagamento.capture,
        amount: Math.round(pagamento.amount * 100),
        card_number: pagamento.card_number,
        card_holder_name: pagamento.card_holder_name,
        card_expiration_date: pagamento.card_expiration_date,
        card_cvv: pagamento.card_cvv
      }))
      .then(console.log('Transação efetuada com sucesso!'))
      .catch(err => console.log('ERRO NA CONFIRMAÇÃO', err));
  }

}
