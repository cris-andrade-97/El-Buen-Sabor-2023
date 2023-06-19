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
    //this.spinner.show();
    this.auth.user$.subscribe(async (user: any) => {
      if (user) {
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }
/**
 * { user_rol: "Usuario", nickname: "cristian201097", name: "cristian201097@gmail.com", 
 * picture: "https://s.gravatar.com/avatar/ea1df0e093f29d88aaaeb2260800ebeb?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fcr.png", 
 * updated_at: "2023-05-13T17:52:40.882Z", 
 * email: "cristian201097@gmail.com", 
 * email_verified: true, 
 * sub: "auth0|6440313fe671c7c9c591ad81" }
 *
 */
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
