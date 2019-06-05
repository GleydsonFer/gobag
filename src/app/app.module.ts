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
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
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
import { CategoriasComponent } from './categorias/categorias.component';
import { BannerSlideComponent } from './banner-slide/banner-slide.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';

//
import  CarrinhoService  from './carrinho.service'
import { ReactiveFormsModule } from '@angular/forms'


registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    RestaurantesComponent,
    DiversaoComponent,
    OfertaComponent,
    ComoUsarComponent,
    OndeFicaComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    InfantilComponent,
    FitnessComponent,
    TeenComponent,
    CalcadosComponent,
    CategoriasComponent,
    BannerSlideComponent,
    OrdemCompraSucessoComponent,
    //ajustanto o erro ngIf
    
    //
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //ajustanto o erro ngIf
    
    ReactiveFormsModule,
    
    //
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ CarrinhoService, { provide: LOCALE_ID, useValue: 'pt-Br' } 
],
  bootstrap: [AppComponent],
  //
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
   ]
  //
})
export class AppModule { }


