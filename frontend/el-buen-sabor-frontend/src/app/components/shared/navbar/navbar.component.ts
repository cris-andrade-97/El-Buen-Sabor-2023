import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
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

  constructor(
    public auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.ruta = window.location.pathname
    this.spinner.show();    
    this.auth.user$.subscribe(async (user) => {
      if (user) {
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
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
