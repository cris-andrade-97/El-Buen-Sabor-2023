import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { GrillaRubroIngredientesComponent } from './components/rubros/grilla-rubro-ingredientes/grilla-rubro-ingredientes.component';
import { GrillaRubroProductosComponent } from './components/rubros/grilla-rubro-productos/grilla-rubro-productos.component';
import { FormularioRubroIngredientesComponent } from './components/rubros/formulario-rubro-ingredientes/formulario-rubro-ingredientes.component';
import { FormularioRubroProductosComponent } from './components/rubros/formulario-rubro-productos/formulario-rubro-productos.component';
import { FormularioUnidadDeMedidaComponent } from './components/unidad-de-medida/formulario-unidad-de-medida/formulario-unidad-de-medida.component';
import { GrillaUnidadDeMedidaComponent } from './components/unidad-de-medida/grilla-unidad-de-medida/grilla-unidad-de-medida.component';
import { GrillaIngredientesComponent } from './components/ingredientes/grilla-ingredientes/grilla-ingredientes.component';
import { FormularioIngredientesComponent } from './components/ingredientes/formulario-ingredientes/formulario-ingredientes.component';
import { GrillaArticulosManufacturadosComponent } from './components/articulos-manufacturados/grilla-articulos-manufacturados/grilla-articulos-manufacturados.component';
import { FormularioArticulosManufacturadosComponent } from './components/articulos-manufacturados/formulario-articulos-manufacturados/formulario-articulos-manufacturados.component';
import { RegistrarCompraIngredienteComponent } from './components/ingredientes/registrar-compra-ingrediente/registrar-compra-ingrediente.component';
import { DetalleArticuloManufacturadoComponent } from './components/articulos-manufacturados/detalle-articulo-manufacturado/detalle-articulo-manufacturado.component';
import { CartComponent } from './components/cart-component/cart-component.component';
import { ControlStockIngredientesComponent } from './components/ingredientes/control-stock-ingredientes/control-stock-ingredientes.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '*', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'opciones', component: OpcionesComponent },
  { path: 'carrito', component: CartComponent },
  {
    path: 'grilla-rubro-ingredientes',
    component: GrillaRubroIngredientesComponent,
  },
  { path: 'grilla-rubro-productos', component: GrillaRubroProductosComponent },
  {
    path: 'grilla-articulos-manufacturados',
    component: GrillaArticulosManufacturadosComponent,
  },
  { path: 'grilla-unidad-de-medida', component: GrillaUnidadDeMedidaComponent },
  {
    path: 'formulario-rubro-ingredientes/:id',
    component: FormularioRubroIngredientesComponent,
  },
  {
    path: 'formulario-articulos-manufacturados/:id',
    component: FormularioArticulosManufacturadosComponent,
  },
  {
    path: 'detalle-articulo-manufacturado/:id',
    component: DetalleArticuloManufacturadoComponent,
  },
  {
    path: 'formulario-rubro-productos/:id',
    component: FormularioRubroProductosComponent,
  },
  {
    path: 'formulario-unidad-de-medida/:id',
    component: FormularioUnidadDeMedidaComponent,
  },
  {
    path: 'grilla-ingredientes',
    component: GrillaIngredientesComponent,
  },
  {
    path: 'formulario-ingredientes/:id',
    component: FormularioIngredientesComponent,
  },
  {
    path: 'registrar-compra-ingrediente',
    component: RegistrarCompraIngredienteComponent,
  },
  {
    path: 'registrar-compra-ingrediente/:id',
    component: RegistrarCompraIngredienteComponent
  },
  {
    path: 'control-stock-ingredientes',
    component: ControlStockIngredientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
