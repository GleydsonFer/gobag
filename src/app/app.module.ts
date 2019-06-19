import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

//ajustanto o erro ngIf



//
import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MasculinoComponent } from './masculino/masculino.component';
import { FemininoComponent } from './feminino/feminino.component';
import { FitnessComponent } from './fitness/fitness.component';
import { InfantilComponent } from './infantil/infantil.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';

//pipe
import { DescricaoReduzida } from './util/descricao-reduzida.pipe';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import localePtBr from '@angular/common/locales/pt';

import { registerLocaleData } from '@angular/common';
import { from } from 'rxjs';
import { TeenComponent } from './teen/teen.component';
import { CalcadosComponent } from './calcados/calcados.component';
import { BannerSlideComponent } from './banner-slide/banner-slide.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';

//
import  CarrinhoService  from './carrinho.service'
import { ReactiveFormsModule } from '@angular/forms'

import { TendenciasComponent } from './tendencias/tendencias.component';
import { Tendencia01Component } from './tendencia01/tendencia01.component';
import { OfertasService } from './ofertas.service';
import { Tendencia02Component } from './tendencia02/tendencia02.component';
import { Tendencia03Component } from './tendencia03/tendencia03.component';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    MasculinoComponent,
    FemininoComponent,
    OfertaComponent,
    ComoUsarComponent,
    OndeFicaComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    InfantilComponent,
    FitnessComponent,
    TeenComponent,
    CalcadosComponent,
    BannerSlideComponent,
    OrdemCompraSucessoComponent,
    TendenciasComponent,
    Tendencia01Component,
    Tendencia02Component,
    Tendencia03Component,
    //ajustanto o erro ngIf
    
    //
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //CategoriasModule,
    //ajustanto o erro ngIf
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ 
    CarrinhoService, { provide: LOCALE_ID, useValue: 'pt-Br' },
    OfertasService   
  ],
  bootstrap: [
    AppComponent
  ],
  //
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
  //
})
export class AppModule { }


