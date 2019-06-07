import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-categoria03',
  templateUrl: './categoria03.component.html',
  styleUrls: ['./categoria03.component.css']
})
export class Categoria03Component implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('primaveira')
      .then(( ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }
}
