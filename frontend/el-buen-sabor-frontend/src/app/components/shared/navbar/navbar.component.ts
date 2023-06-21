import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CartService } from 'src/app/services/cart-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  ruta: string = ""
  termino: string = ""
  largoCarrito: number = 0;
  items: any[] = [];

  constructor(
    private cartServ: CartService,
    public auth: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.amountItems();
    this.ruta = window.location.pathname
    //this.spinner.show();
    this.auth.user$.subscribe(async (user: any) => {
      if (user) {
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  //Donde sea que hagas click, el numero del carrito se actualiza. No es lo mejor pero funciona.
  @HostListener('window:click', ['$event'])
  async amountItems() {
    this.largoCarrito = await this.cartServ.devolverAmount();
  }

  buscarArticuloManufacturado(event: any) {
    if (this.termino == "" || !this.termino) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La búsqueda no puede ser vacía!',
      });
    } else {
      /*let url = new URL("http://localhost:4200/inicio")
      url.searchParams.append('busqueda', this.termino)
      window.location.replace(url)
      return;*/
      let url = new URL("http://localhost:4200/inicio")
      url.searchParams.append('busqueda', this.termino)
      window.location.href = url.toString()
      return;
    }
  }

  async login() {
    this.auth.loginWithRedirect();
  }

  logOut() {
    this.auth.logout();
  }
}
