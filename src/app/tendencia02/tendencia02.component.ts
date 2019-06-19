import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-tendencia02',
  templateUrl: './tendencia02.component.html',
  styleUrls: ['./tendencia02.component.css']
})
export class Tendencia02Component implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorTendencia('carnaval')
      .subscribe((ofertas: Oferta[]) => this.ofertas = ofertas)
  }
}
