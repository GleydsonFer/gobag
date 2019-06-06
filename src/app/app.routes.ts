import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { RestaurantesComponent } from './restaurantes/restaurantes.component'
import { DiversaoComponent } from './diversao/diversao.component'
import { OfertaComponent } from './oferta/oferta.component'
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component'
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component'
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component'

import { FitnessComponent } from './fitness/fitness.component'
import { InfantilComponent } from './infantil/infantil.component'
import { CalcadosComponent } from './calcados/calcados.component'
import { TeenComponent } from './teen/teen.component'



export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'restaurantes', component: RestaurantesComponent },
    { path: 'infantil', component: InfantilComponent },
    { path: 'fitness', component: FitnessComponent },
    { path: 'teen', component: TeenComponent },
    { path: 'calcados', component: CalcadosComponent },
    { path: 'diversao', component: DiversaoComponent },
    { path: 'oferta', component: HomeComponent },
    { path: 'oferta/:id', component: OfertaComponent, 
        children: [
            { path: '', component: ComoUsarComponent },
            { path: 'como-usar', component: ComoUsarComponent },
            { path: 'onde-fica', component: OndeFicaComponent },
        ] 
    },
    { path: 'ordem-compra', component: OrdemCompraComponent }
]