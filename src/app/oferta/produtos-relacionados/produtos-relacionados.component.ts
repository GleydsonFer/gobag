import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/produto.model';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-produtos-relacionados',
  templateUrl: './produtos-relacionados.component.html',
  styleUrls: ['./produtos-relacionados.component.css'],
  providers: [ OfertasService ]
})
export class ProdutosRelacionadosComponent implements OnInit {

  @Input() prod: Produto;
  produtos: Observable<any>;

  constructor(
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    this.produtos = this.ofertasService.getProdutosByLojas(this.prod.loja)
  }

  }

