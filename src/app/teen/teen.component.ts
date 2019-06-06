import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-teen',
  templateUrl: './teen.component.html',
  styleUrls: ['./teen.component.css'],
  providers: [ OfertasService ]
})
export class TeenComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('teen')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
