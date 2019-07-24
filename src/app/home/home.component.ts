import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Observable } from 'rxjs';
import { Produto } from '../shared/produto.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];
  public produtos: any;

  constructor(
    private ofertasService: OfertasService,
  ) { }

  ngOnInit() {

    this.ofertasService.getAllProdutos().subscribe(prod => {
      this.produtos = prod;
    });

  }

  
}