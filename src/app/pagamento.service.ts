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
  public helloWorld(){
    return this.http.get('https://us-central1-gobag-delivery.cloudfunctions.net/helloWorld', {responseType: 'text'});
  }

  // Mostrar as transações realizadas
  public mostrarTransferencias() {
    return this.http.get('https://us-central1-gobag-delivery.cloudfunctions.net/mostrarTransferencias')
  }

  // Criar uma transação simples
  public iniciarTransferenciaFront(pagamento: Pagamento): Promise<any> {
    
    console.log(pagamento);
    return axios.post('https://us-central1-gobag-delivery.cloudfunctions.net/iniciarTranferencia', 
      pagamento
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }
}

  


