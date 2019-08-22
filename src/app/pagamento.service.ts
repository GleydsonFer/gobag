import { Injectable } from '@angular/core';
import { Pagamento } from './shared/pagamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const axios = require('axios');

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {



  constructor(
    private http: HttpClient
  ) { }

  // Teste de comunicação com o back-end
  // FUNCIONANDO
  public helloWorld() {
    return this.http.get('https://us-central1-gobag-delivery.cloudfunctions.net/helloWorld', { responseType: 'text' });
  }

  // Mostrar as transações realizadas
  public mostrarTransferencias() {
    return this.http.get('https://us-central1-gobag-delivery.cloudfunctions.net/mostrarTransferencias')
  }

  // Criar uma transação simples sem captura
  public iniciarTransferenciaFront(pagamento: Pagamento): Promise<any> {

    console.log(pagamento);

    // é iniciado a requisição http com a url da função do backend que está hospedada no Firebase
    // no corpo da requisição é também enviado os dados do pagamento que são preenchidos pelo usuário na hora de iniciar o pedido
    return axios.post('https://us-central1-gobag-delivery.cloudfunctions.net/iniciarTranferencia', pagamento)
      .then(response => {
        console.log(response);
        return response.data; // aqui é retornado o json de resposta da transação do pagarme, para o componente que usa esse service
      })
      .catch(error => {
        console.log(error);
      });

  }

}
