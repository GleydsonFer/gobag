import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";

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
import { TagInputModule } from 'ngx-chips';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MasculinoComponent } from './masculino/masculino.component';
import { FemininoComponent } from './feminino/feminino.component';
import { FitnessComponent } from './fitness/fitness.component';
import { InfantilComponent } from './infantil/infantil.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ProdutosRelacionadosComponent } from './oferta/produtos-relacionados/produtos-relacionados.component';
import { AvaliacaoComponent } from './oferta/avaliacao/avaliacao.component';

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
import {CarrinhoService} from './carrinho.service'
import { ReactiveFormsModule } from '@angular/forms'

import { TendenciasComponent } from './tendencias/tendencias.component';
import { Tendencia01Component } from './tendencia01/tendencia01.component';
import { OfertasService } from './ofertas.service';
import { Tendencia02Component } from './tendencia02/tendencia02.component';
import { Tendencia03Component } from './tendencia03/tendencia03.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Loja01Component } from './loja01/loja01.component';
import { LojasComponent } from './lojas/lojas.component'
import { TopoLogadoComponent } from './topo-logado/topo-logado.component'
import { AutenticacaoGuard } from './autenticacao-guard.service';

import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { CadastroDeProdutosComponent } from './cadastro-de-produtos/cadastro-de-produtos.component';
import { DadosdepagamentoComponent } from './dadosdepagamento/dadosdepagamento.component';

// app.module.ts

import { OrdemPagamentoComponent } from './ordem-pagamento/ordem-pagamento.component';
import { StatusPedidoComponent } from './status-pedido/status-pedido.component';
import { ItemCarrinhoCompraComponent } from './ordem-compra/item-carrinho-compra/item-carrinho-compra.component';
import { MenuUsuarioComponent } from './acesso/menu-usuario/menu-usuario.component';
import { TermosDeUsoComponent } from './termos-de-uso/termos-de-uso.component';
import { PoliticasDePrivacidadeComponent } from './politicas-de-privacidade/politicas-de-privacidade.component';
import { PoliticasDeDevolucaoComponent } from './politicas-de-devolucao/politicas-de-devolucao.component';
import { OrdemDevolucaoComponent } from './ordem-devolucao/ordem-devolucao.component';
import { CarouselOrdemDevolucaoComponent } from './ordem-devolucao/carousel-ordem-devolucao/carousel-ordem-devolucao.component';
import { CadastroLojistaComponent } from './cadastro-lojista/cadastro-lojista.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {Component} from '@angular/core';
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
    ProdutosRelacionadosComponent,
    AvaliacaoComponent,
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
    TopoLogadoComponent,
    CadastroDeProdutosComponent,
    DadosdepagamentoComponent,
    OrdemPagamentoComponent,
    StatusPedidoComponent,
    ItemCarrinhoCompraComponent,
    MenuUsuarioComponent,
    TermosDeUsoComponent,
    PoliticasDePrivacidadeComponent,
    PoliticasDeDevolucaoComponent,
    OrdemDevolucaoComponent,
    CarouselOrdemDevolucaoComponent,
    CadastroLojistaComponent,
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
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    TagInputModule
  ],
  providers: [
    CarrinhoService, { provide: LOCALE_ID, useValue: 'pt-Br' },
    OfertasService,
    Autenticacao,
    AutenticacaoGuard,

      // possivel solução do problema das rotas ao atualizar:
      {
       provide: LocationStrategy,
       useClass: HashLocationStrategy
       
      }
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

// @Component({
//   selector: 'path-location',
//   providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
  // template: `
  //   <h1>PathLocationStrategy</h1>
  //   Current URL is: <code>{{location.path()}}</code><br>
  //   Normalize: <code>/foo/bar/</code> is: <code>{{location.normalize('foo/bar')}}</code><br>
  // `
// })
// export class PathLocationComponent {
  // location: Location;
  // constructor(location: Location) { this.location = location; }
// }
export class AppModule { }




