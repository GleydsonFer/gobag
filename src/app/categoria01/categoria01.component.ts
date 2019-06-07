import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-categoria01',
  templateUrl: './categoria01.component.html',
  styleUrls: ['./categoria01.component.css']
})
export class Categoria01Component implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('off30')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }
}
