import { AngularFireAuth } from '@angular/fire/auth';
import { PedidoService } from './../pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acompanhar-pedido',
  templateUrl: './acompanhar-pedido.component.html',
  styleUrls: ['./acompanhar-pedido.component.css']
})
export class AcompanharPedidoComponent implements OnInit {


  status: string = ""

  constructor(
    private pedidoService: PedidoService,
    private fireAuth: AngularFireAuth
  ) { }
  ngAfterViewInit(): void {
    this.fireAuth.auth.onAuthStateChanged(user => {
      this.pedidoService.getPedidos(user.email).subscribe(retorno => {
        retorno.forEach((item: any, index) => {
          if (index == 0) {
            this.status = item.status
            if (this.status = 'processando') {
              
            }
          }
        })
      })
    })
  }
  ngOnInit() { }

}
