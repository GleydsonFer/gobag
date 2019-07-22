import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Observable } from 'rxjs';
import { Produto } from '../shared/produto.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];
  public produtos: any;

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

    this.ofertasService.getAllProdutos().subscribe(prod => {
      console.log(prod);
      this.produtos = prod;
      console.log(this.produtos);
    });

  }

  
}