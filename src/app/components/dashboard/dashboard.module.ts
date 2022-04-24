import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BuscarComponent } from './buscar/buscar.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    NavbarComponent,
    InicioComponent,
    PerfilComponent,
    BuscarComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule  
  ],
  exports:[
    NavbarComponent,
    InicioComponent,
    PerfilComponent,
    BuscarComponent,
    RegistroComponent
  ]
})
export class DashboardModule { }
