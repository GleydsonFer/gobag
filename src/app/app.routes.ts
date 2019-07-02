import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { MasculinoComponent } from './masculino/masculino.component'
import { FemininoComponent } from './feminino/feminino.component'
import { OfertaComponent } from './oferta/oferta.component'
import { ProdutosRelacionadosComponent } from './oferta/produtos-relacionados/produtos-relacionados.component'
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component'
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component'

import { FitnessComponent } from './fitness/fitness.component'
import { InfantilComponent } from './infantil/infantil.component'
import { CalcadosComponent } from './calcados/calcados.component'
import { TeenComponent } from './teen/teen.component'
import { Tendencia01Component } from './tendencia01/tendencia01.component';
import { Tendencia02Component } from './tendencia02/tendencia02.component';
import { Tendencia03Component } from './tendencia03/tendencia03.component';
import { Loja01Component } from './loja01/loja01.component'
import { AcessoComponent } from './acesso/acesso.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'acesso', component: AcessoComponent },
    { path: 'masculino', component: MasculinoComponent },
    { path: 'infantil', component: InfantilComponent },
    { path: 'fitness', component: FitnessComponent },
    { path: 'teen', component: TeenComponent },
    { path: 'calcados', component: CalcadosComponent },
    { path: 'feminino', component: FemininoComponent },
    { path: 'oferta', component: HomeComponent },
    {
        path: 'oferta/:id', component: OfertaComponent,
        children: [
            { path: '', component: ProdutosRelacionadosComponent },
            { path: 'produtos-relacionados', component: ProdutosRelacionadosComponent },
            { path: 'onde-fica', component: OndeFicaComponent },
        ]
    },
    { path: 'ordem-compra', component: OrdemCompraComponent },
    { path: 'tendencia01', component: Tendencia01Component },
    { path: 'tendencia02', component: Tendencia02Component },
    { path: 'tendencia03', component: Tendencia03Component },
    { path: 'loja01', component: Loja01Component }

]