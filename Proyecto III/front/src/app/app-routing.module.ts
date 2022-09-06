import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CardComponent} from './card/card.component'
import{ViewComponent} from './view/view.component'
import { SelectComponent } from './select/select.component';
import { ReporteComponent } from './reporte/reporte.component';
import{PerfilComponent} from './perfil/perfil.component'

const routes: Routes = [

  {path:"resultados", component: CardComponent},
  {path:"principal", component: ViewComponent},
  {path:"buscar", component:SelectComponent},
  {path:"reporte/:id", component:ReporteComponent},
  {path:"perfil", component:PerfilComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
