import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-masculino',
  templateUrl: './masculino.component.html',
  styleUrls: ['./masculino.component.css'],
  providers: [ OfertasService ]
})
export class MasculinoComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('masculino')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
