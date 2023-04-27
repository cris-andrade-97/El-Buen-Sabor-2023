import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { GrillaRubroIngredientesComponent } from './components/rubros/grilla-rubro-ingredientes/grilla-rubro-ingredientes.component';
import { GrillaRubroProductosComponent } from './components/rubros/grilla-rubro-productos/grilla-rubro-productos.component';
import { FormularioRubroIngredientesComponent } from './components/rubros/formulario-rubro-ingredientes/formulario-rubro-ingredientes.component';
import { FormularioRubroProductosComponent } from './components/rubros/formulario-rubro-productos/formulario-rubro-productos.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '*', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'opciones', component: OpcionesComponent},
  {path: 'grilla-rubro-ingredientes', component: GrillaRubroIngredientesComponent},
  {path: 'grilla-rubro-productos', component: GrillaRubroProductosComponent},
  {path: 'formulario-rubro-ingredientes', component: FormularioRubroIngredientesComponent},
  {path: 'formulario-rubro-productos', component: FormularioRubroProductosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
