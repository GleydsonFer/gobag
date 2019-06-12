import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { MasculinoComponent } from './masculino/masculino.component'
import { FemininoComponent } from './feminino/feminino.component'
import { OfertaComponent } from './oferta/oferta.component'
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component'
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component'
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component'

import { FitnessComponent } from './fitness/fitness.component'
import { InfantilComponent } from './infantil/infantil.component'
import { CalcadosComponent } from './calcados/calcados.component'
import { TeenComponent } from './teen/teen.component'
import { Categoria01Component } from './categoria01/categoria01.component';
import { Categoria02Component } from './categoria02/categoria02.component';
import { Categoria03Component } from './categoria03/categoria03.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
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
            { path: '', component: ComoUsarComponent },
            { path: 'como-usar', component: ComoUsarComponent },
            { path: 'onde-fica', component: OndeFicaComponent },
        ]
    },
    { path: 'ordem-compra', component: OrdemCompraComponent },
    { path: 'categoria01', component: Categoria01Component },
    { path: 'categoria02', component: Categoria02Component },
    { path: 'categoria03', component: Categoria03Component }

]