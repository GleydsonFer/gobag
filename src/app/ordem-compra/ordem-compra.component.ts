import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import CarrinhoService from '../carrinho.service';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';
import { UsuarioService } from './../usuario.service';
import { Carrinho } from '../shared/carrinho.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  carrinhoObservable: Observable<any>;
  carrinho: Carrinho;
  usuario: any;
  idPedidoCompra: string;

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService,
    private userService: UsuarioService,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.afAuth.auth.onAuthStateChanged(user => {
      console.log(user.emailVerified)
      this.userService.getUsuario(user.email).subscribe((usuario) => {
        // recupera  carrinho a partir do banco de dados
        this.carrinhoObservable = this.carrinhoService.getCarrinhoByEmail(user.email);
        this.carrinhoObservable.subscribe(car => {
          this.carrinho = car[0];
        })
        usuario.forEach(usuario => {
          this.usuario = usuario
        })
        
      })
    })
    // setTimeout(this.testaCarrinho, 2000);
  }
  
  // testaCarrinho(){
  //   this.carrinho.subscribe(car => {
  //     console.log(car);
  //   })
  // }

  public confirmarCompra(): void {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (!user.emailVerified) {
        this.toastr.error("Verifica seu email e tente novamente.", "Email ainda não verificado")
        console.log("email ainda não verificado!\n verifique seu email e tente novamente");
      } else {

        if (this.carrinhoService.exibirItens().length === 0) {
          alert('Você não selecionou nenhm item!')
        } else {

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
            this.carrinhoService.exibirItens().map((obj) => { return Object.assign({}, obj) }),
            // valor total
            this.carrinhoService.totalCarrinhoCompras(),
            // desconto?
            0
          );

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
}