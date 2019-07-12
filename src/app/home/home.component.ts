import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];
  public produtos: Observable<any>;

  constructor(
    private ofertasService: OfertasService,
    
    ) { }

  ngOnInit() {
    //this.ofertas = this.ofertasService.getOfertas()
    //console.log(this.ofertas)

    // Puxando ofertas da API fake
    // this.ofertasService.getOfertas()
    //   .then(( ofertas: Oferta[] ) => { 
    //     this.ofertas = ofertas 
    //   })
    //   .catch(( param: any ) => { 
    //   });

    this.produtos = this.ofertasService.getAllProdutos();
    console.log(this.produtos);

  }

  
}