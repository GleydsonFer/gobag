import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import CarrinhoService from '../carrinho.service'
import { ToastrService } from 'ngx-toastr';

import { Oferta } from '../shared/oferta.model'
import { AutenticacaoGuard } from '../autenticacao-guard.service';
import { Observable } from 'rxjs';
import { Produto } from '../shared/produto.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]

})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;
  public produto: Observable<any>;
  @Output() public prod: Produto;

  public naoLogado: any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService,
    private toastr: ToastrService,
    private autenticacaoGuard: AutenticacaoGuard,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      this.produto = this.ofertasService.getProdutoByID(parametros.id_produto);
      this.produto.subscribe(prod => {
        this.prod = prod[0];
      })
    })
  }

  ngOnDestroy() {
  }

  // Função para adicionar itens ao carrinho
  public adicionarItemCarrinho(): void {

    this.naoLogado = this.autenticacaoGuard.canActivateVerOfertaNaoLogado();

    if (this.naoLogado) {
      this.carrinhoService.incluirItem(this.prod);
      this.toastr.success('Oferta adicionada com sucesso!', `${this.prod.nome}`);
    }

  }



}
