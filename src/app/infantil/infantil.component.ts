import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-infantil',
  templateUrl: './infantil.component.html',
  styleUrls: ['./infantil.component.css'],
  providers: [ OfertasService ]
})
export class InfantilComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService ) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('infantil')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
