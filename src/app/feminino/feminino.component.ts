import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-feminino',
  templateUrl: './feminino.component.html',
  styleUrls: ['./feminino.component.css'],
  providers: [ OfertasService ]
})
export class FemininoComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService ) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('feminino')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
