import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-tendencia01',
  templateUrl: './tendencia01.component.html',
  styleUrls: ['./tendencia01.component.css']
})
export class Tendencia01Component implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorTendencia('off30')
      .subscribe((ofertas: Oferta[]) => this.ofertas = ofertas)
  }
}
