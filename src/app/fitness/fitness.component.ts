import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css'],
  providers: [ OfertasService ]
})
export class FitnessComponent implements OnInit {

  public ofertas: Oferta[];
  public produtos: Observable<any>;

  constructor(private ofertasService: OfertasService ) { }

  ngOnInit() {
    this.produtos = this.ofertasService.getProdutosByCategorias('fitness');

  }

}
