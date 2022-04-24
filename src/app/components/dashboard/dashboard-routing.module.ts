import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './buscar/buscar.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path:'', component: DashboardComponent, children:[
    {path: '', component:InicioComponent},
    {path: 'perfil', component:PerfilComponent},
    {path: 'buscar', component:BuscarComponent},
    {path: 'registrar', component:RegistroComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
