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

  public tamanho: any[] = [];
  public produto: Observable<any>;
  @Output() public prod: Produto;
  public aux: any[] = ['selecionado', 'valor']

  public naoLogado: any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService,
    private toastr: ToastrService,
    private autenticacaoGuard: AutenticacaoGuard,
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      this.produto = this.ofertasService.getProdutoByID(parametros.id_produto);
      this.produto.subscribe(prod => {

        for (var [key, value] of Object.entries(prod[0].tamanho)) {
          this.tamanho.push({ key, value, selecionado: false })
        }
        this.prod = prod[0];
      })

    })


  }

  ngOnDestroy() {

  }

  // Função para adicionar itens ao carrinho
  public adicionarItemCarrinho(): void {

    this.tamanho.forEach(item => {
      if (item.selecionado == true) {
        this.aux[0] = true
        this.aux[1] = item.key;
      }
    })
    if (this.aux[0] == true) {
      this.naoLogado = this.autenticacaoGuard.canActivateVerOfertaNaoLogado();

      if (this.naoLogado) {
        this.prod.tamanho = this.aux[1];
        this.carrinhoService.incluirItem(this.prod);
        this.toastr.success('Oferta adicionada com sucesso!', `${this.prod.nome}`);
      }
    } else {
      this.toastr.error('Você deve selecionar um tamanho primeiro!')
    }
  }

  conferirNull(value, selecionado) {
    if (value !== null && value !== undefined && value !== "0") {
      if (selecionado == true) {
        return {
          'tamanho_disponivel selecionado': true
        }
      } else {
        return {
          'tamanho_disponivel': true
        }
      }

    } else {
      return {
        'tamanho_indisponivel': true
      }
    }
  }

  selecionarTamanho(value) {
    this.tamanho.forEach((item) => {
      if (value == item.key) {
        item.selecionado = true
      } else {
        item.selecionado = false
      }
    })
  }

}
