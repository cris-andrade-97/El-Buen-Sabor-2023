import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { GrillaRubroIngredientesComponent } from './components/rubros/grilla-rubro-ingredientes/grilla-rubro-ingredientes.component';
import { GrillaRubroProductosComponent } from './components/rubros/grilla-rubro-productos/grilla-rubro-productos.component';
import { FormularioRubroProductosComponent } from './components/rubros/formulario-rubro-productos/formulario-rubro-productos.component';
import { FormularioRubroIngredientesComponent } from './components/rubros/formulario-rubro-ingredientes/formulario-rubro-ingredientes.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPopper } from 'angular-popper';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { GrillaUnidadDeMedidaComponent } from './components/unidad-de-medida/grilla-unidad-de-medida/grilla-unidad-de-medida.component';
import { FormularioUnidadDeMedidaComponent } from './components/unidad-de-medida/formulario-unidad-de-medida/formulario-unidad-de-medida.component';
import { FormularioIngredientesComponent } from './components/ingredientes/formulario-ingredientes/formulario-ingredientes.component';
import { GrillaIngredientesComponent } from './components/ingredientes/grilla-ingredientes/grilla-ingredientes.component';
import { GrillaArticulosManufacturadosComponent } from './components/articulos-manufacturados/grilla-articulos-manufacturados/grilla-articulos-manufacturados.component';
import { FormularioArticulosManufacturadosComponent } from './components/articulos-manufacturados/formulario-articulos-manufacturados/formulario-articulos-manufacturados.component';

import { RegistrarCompraIngredienteComponent } from './components/ingredientes/registrar-compra-ingrediente/registrar-compra-ingrediente.component';
import { DetalleArticuloManufacturadoComponent } from './components/articulos-manufacturados/detalle-articulo-manufacturado/detalle-articulo-manufacturado.component';
import { CartService } from './services/cart-service.service';
import { CartComponent } from './components/cart-component/cart-component.component';
import { ControlStockIngredientesComponent } from './components/ingredientes/control-stock-ingredientes/control-stock-ingredientes.component';
import { DeliveryService } from './services/delivery.service';
import { GrillaPedidosComponent } from './components/pedidos/grilla-pedidos/grilla-pedidos.component';
import { DetallesPedidoComponent } from './components/pedidos/detalles-pedido/detalles-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarCompraIngredienteComponent,
    InicioComponent,
    DashboardComponent,
    NavbarComponent,
    OpcionesComponent,
    FooterComponent,
    GrillaRubroIngredientesComponent,
    GrillaRubroProductosComponent,
    FormularioRubroProductosComponent,
    FormularioRubroIngredientesComponent,
    GrillaUnidadDeMedidaComponent,
    FormularioUnidadDeMedidaComponent,
    FormularioIngredientesComponent,
    GrillaIngredientesComponent,
    GrillaArticulosManufacturadosComponent,
    FormularioArticulosManufacturadosComponent,
    DetalleArticuloManufacturadoComponent,
    CartComponent,
    ControlStockIngredientesComponent,
    GrillaPedidosComponent,
    DetallesPedidoComponent,
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgxPopper,
    TooltipModule.forRoot(),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-138fig3286kuaadw.us.auth0.com',
      clientId: 'SpaVuja5CitBmOdyKMiniTmhB6XSR8Nx',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    HttpClientModule,
    NgbModule,
  ],
  providers: [CartService, DeliveryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
