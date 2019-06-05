import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css'],
  providers: [ OfertasService ]
})
export class FitnessComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService ) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('fitness')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
