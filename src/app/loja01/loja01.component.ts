import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-loja01',
  templateUrl: './loja01.component.html',
  styleUrls: ['./loja01.component.css']
})
export class Loja01Component implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorAnunciante('riachuelo')
      .then((ofertas: Oferta[]) => this.ofertas = ofertas)
  }

}
