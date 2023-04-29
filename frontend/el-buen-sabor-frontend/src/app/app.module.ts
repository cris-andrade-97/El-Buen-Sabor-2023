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

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    DashboardComponent,
    NavbarComponent,
    OpcionesComponent,
    FooterComponent,
    GrillaRubroIngredientesComponent,
    GrillaRubroProductosComponent,
    FormularioRubroProductosComponent,
    FormularioRubroIngredientesComponent,
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-138fig3286kuaadw.us.auth0.com',
      clientId: 'SpaVuja5CitBmOdyKMiniTmhB6XSR8Nx',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
