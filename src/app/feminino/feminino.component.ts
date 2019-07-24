import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feminino',
  templateUrl: './feminino.component.html',
  styleUrls: ['./feminino.component.css'],
  providers: [ OfertasService ]
})
export class FemininoComponent implements OnInit {

  public ofertas: Oferta[];
  public produtos: Observable<any>

  constructor(private ofertasService: OfertasService ) { }

  ngOnInit() {
    this.produtos = this.ofertasService.getProdutosByCategorias('feminino');
  }

}
