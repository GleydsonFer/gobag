import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import CarrinhoService from '../carrinho.service'
import { ToastrService } from 'ngx-toastr';

import { Oferta } from '../shared/oferta.model'
import { AutenticacaoGuard } from '../autenticacao-guard.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]

})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  public naoLogado : any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService,
    private toastr: ToastrService,
    private autenticacaoGuard : AutenticacaoGuard,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {

      this.ofertasService.getOfertaPorId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta
          //console.log(this.oferta)
        })
    })
  }

  ngOnDestroy() {
  }

  public adicionarItemCarrinho(): void {
      
      this.naoLogado = this.autenticacaoGuard.canActivateVerOfertaNaoLogado();
      console.log(this.naoLogado)
      if(this.naoLogado){
      this.carrinhoService.incluirItem(this.oferta);
      this.toastr.success('Oferta adicionada com sucesso!', `${this.oferta.titulo}`);
      console.log(this.carrinhoService.exibirItens());
    }
    
  }



}
