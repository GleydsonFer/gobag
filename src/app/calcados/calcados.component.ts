import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'


@Component({
  selector: 'app-calcados',
  templateUrl: './calcados.component.html',
  styleUrls: ['./calcados.component.css'],
  providers: [ OfertasService ]
})
export class CalcadosComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('calcados')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
