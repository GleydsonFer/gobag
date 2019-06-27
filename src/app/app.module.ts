import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


//cadastro

import { Autenticacao } from './autenticacao.service'
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { AppRoutingModule } from './app-routing.module';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';




//
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { OwlModule } from 'ngx-owl-carousel';
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



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Loja01Component } from './loja01/loja01.component';
import { LojasComponent } from './lojas/lojas.component'


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
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    Loja01Component,
    LojasComponent,
    //ajustanto o erro ngIf
    
    //
  ],
  imports: [
    BrowserModule,
    OwlModule,
    HttpModule,
    BrowserAnimationsModule,
    //CategoriasModule,
    //ajustanto o erro ngIf
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AppRoutingModule
  ],
  providers: [ 
    CarrinhoService, { provide: LOCALE_ID, useValue: 'pt-Br' },
    OfertasService,
    Autenticacao   
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


