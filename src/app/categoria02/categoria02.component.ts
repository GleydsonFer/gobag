import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-categoria02',
  templateUrl: './categoria02.component.html',
  styleUrls: ['./categoria02.component.css']
})
export class Categoria02Component implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('carnaval')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }
}
