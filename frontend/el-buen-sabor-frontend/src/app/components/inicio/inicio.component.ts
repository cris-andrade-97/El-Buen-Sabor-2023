import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import axios from 'axios';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  articulosManufacturados!: any;

  constructor(
    public auth: AuthService,
    private router: Router,
    private el: ElementRef,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    await this.llenarLista();
    this.el.nativeElement
      .querySelectorAll('.scroll-to')
      .forEach((element: any) => {
        element.addEventListener('click', () => {
          const section = document.querySelector(element.getAttribute('href'));
          window.scrollTo({
            behavior: 'smooth',
            top: section.offsetTop,
          });
        });
      });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/articulos-manufacturados/listar';

    this.http.get(url).subscribe((response) => {
      this.articulosManufacturados = response;
    });
  }

  // async addRolesToUser(userId: string, roles: string) {
  //   try {
  //     const response = await axios.post(
  //       `https://dev-138fig3286kuaadw.us.auth0.com/api/v2/users/${userId}/roles`,
  //       { roles },
  //       {
  //         headers: {
  //           'content-type': 'application/json',
  //           authorization:
  //             'Bearer TOKEN_ID',
  //           'cache-control': 'no-cache',
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('No se pudieron agregar los roles al usuario');
  //   }
  // }
}
