import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css'],
  providers: [ OfertasService ]
})
export class AvaliacaoComponent implements OnInit {

  public ondeFica: string = ''

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
        .then((descricao: string) => { 
          this.ondeFica = descricao
        })
    })
  }

}
