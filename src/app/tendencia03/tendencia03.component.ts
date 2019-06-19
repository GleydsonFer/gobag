import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-tendencia03',
  templateUrl: './tendencia03.component.html',
  styleUrls: ['./tendencia03.component.css']
})
export class Tendencia03Component implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorTendencia('primaveira')
      .subscribe((ofertas: Oferta[]) => this.ofertas = ofertas)
  }
}
