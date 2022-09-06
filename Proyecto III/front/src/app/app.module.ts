import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ViewComponent } from './view/view.component';
import { SelectComponent } from './select/select.component';
import { HttpClientModule } from '@angular/common/http';
import { ReporteComponent } from './reporte/reporte.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ViewComponent,
    SelectComponent,
    ReporteComponent,
    PerfilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
