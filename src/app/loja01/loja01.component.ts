import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loja01',
  templateUrl: './loja01.component.html',
  styleUrls: ['./loja01.component.css']
})
export class Loja01Component implements OnInit {

  public ofertas: Oferta[];
  public produtos: Observable<any>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.produtos = this.ofertasService.getProdutosByLojas('riachuelo');
      
  }

}
