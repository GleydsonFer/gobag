import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-masculino',
  templateUrl: './masculino.component.html',
  styleUrls: ['./masculino.component.css'],
  providers: [ OfertasService ]
})
export class MasculinoComponent implements OnInit {

  public ofertas: Oferta[];
  public produtos: Observable<any>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.produtos = this.ofertasService.getProdutosByCategorias('masculino');
  }

}
