import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import axios from 'axios';
import { CartService } from 'src/app/services/cart-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  articulosManufacturados: any[] = [];
  pizzas: any[] = [];
  hamburguesas: any[] = [];
  lomosArray: any[] = [];
  user: any;
  termino: string = "";

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private http: HttpClient,
    private carritoService: CartService
  ) { }

  async ngOnInit(): Promise<void> {

    const urlParams = new URLSearchParams(window.location.search);
    this.termino = urlParams.get('busqueda')?.toString()!;

    this.auth.user$.subscribe(async (user) => {
      if (user) {
        this.user = user;
      }
    });
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

  async login() {
    this.auth.loginWithRedirect();
  }

  async agregarAlCarrito(producto: any) {
    if (this.user !== null) {
      this.carritoService.addItem(producto);
      await Swal.fire('Producto agregado!');
    } else {
      await Swal.fire(
        'Debe estar logeado para agregar artículos al carrito',
        'Será redireccionado al Log In'
      );
      await this.login();
    }
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/articulos-manufacturados/listar';

    this.http.get(url).subscribe((response: any) => {
      if (this.termino) {
        this.articulosManufacturados = response.filter((obj: { nombre: string; }) => {
          return obj.nombre.toLowerCase().includes(this.termino.toLowerCase())
        }
        );
      } else {
        this.articulosManufacturados = response;
        for (let i = 0; i < this.articulosManufacturados.length; i++) {
          if (this.articulosManufacturados[i].estado == true) {
            if (this.articulosManufacturados[i].rubroArticulo == 'Pizzas') {
              this.pizzas.push(this.articulosManufacturados[i]);
            } else if (
              this.articulosManufacturados[i].rubroArticulo == 'Hamburguesas'
            ) {
              this.hamburguesas.push(this.articulosManufacturados[i]);
            } else if (this.articulosManufacturados[i].rubroArticulo == 'Lomos') {
              this.lomosArray.push(this.articulosManufacturados[i]);
            }
          }
        }
      }
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
