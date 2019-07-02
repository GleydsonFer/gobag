import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service'
import { Oferta } from 'src/app/shared/oferta.model';

@Component({
  selector: 'app-produtos-relacionados',
  templateUrl: './produtos-relacionados.component.html',
  styleUrls: ['./produtos-relacionados.component.css'],
  providers: [ OfertasService ]
})
export class ProdutosRelacionadosComponent implements OnInit {

  // public comoUsar: string = '';
  public oferta: Oferta;
  public ofertasPorAnunciante: Oferta[];
  public anunciante: string;

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    //função para puxar os produtos relacionados
    this.route.parent.params.subscribe((parametros: Params) => {

      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        //seleciona a oferta a partir do id que é conseguido da rota pai (oferta)
        this.oferta = oferta
        
        //função que retorna um array com as ofertas que tenham o mesmo anunciante 
        //da oferta selecionada
        this.ofertasService.getOfertasPorAnunciante(this.oferta.anunciante)
        .then((ofertas: Oferta[]) => {
          //para o objeto selecionado não aparecer nos produtos relacionados também
          for(let i = 0; i < ofertas.length; i++){
            if(ofertas[i].id === this.oferta.id){
              ofertas.splice(i, 1)
            }
          }
          this.ofertasPorAnunciante = ofertas.splice(0, 4);
        });
      });
    });
  }

  }

