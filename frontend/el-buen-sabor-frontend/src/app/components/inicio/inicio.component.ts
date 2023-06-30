import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import axios from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { Cliente } from 'src/app/entidades/Cliente';
import { Rol } from 'src/app/entidades/Rol';
import { Usuario } from 'src/app/entidades/Usuario';
import { CartService } from 'src/app/services/cart-service.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  articulosManufacturados: ArticuloManufacturado[] = [];
  pizzas: any[] = [];
  hamburguesas: any[] = [];
  lomosArray: any[] = [];
  user: any;
  termino: string = '';
  usuario: Usuario = new Usuario();
  cliente: Cliente = new Cliente();
  roles: Rol[] = [];

  constructor(
    private carritoService: CartService,
    public auth: AuthService,
    private router: Router,
    private el: ElementRef,
    private servicioDelivery: DeliveryService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    const urlParams = new URLSearchParams(window.location.search);
    this.termino = urlParams.get('busqueda')?.toString()!;
    this.auth.user$.subscribe(async (user) => {
      if (user) {
        this.user = user;
      }
    });
    await this.getRoles();
    await this.getUserInfo();
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
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  async login() {
    this.auth.loginWithRedirect();
  }

  async getRoles() {
    this.roles = await this.servicioDelivery.get('rol');
  }

  async getUserInfo() {
    try {
      const user = await firstValueFrom(this.auth.user$);
      if (user) {
        //Seteo datos de Usuario
        this.usuario.usuario = user.name || '';
        this.usuario.uid = user.sub || '';
        //this.usuario.clave = falta obtener password
        for (let i = 0; i < this.roles.length; i++) {
          if (user?.['user_rol'] == this.roles[i].denominacion) {
            this.usuario.rol = this.roles[i];
          }
        }
        //Seteo datos de Cliente
        this.cliente.nombre = user.nickname || '';
        this.cliente.apellido = user.family_name || '';
        this.cliente.telefono = user.phone_number
          ? parseInt(user.phone_number)
          : 0;
        this.cliente.email = user.email || '';

        //Corroboro si ya se encuentra registrado en la base de datos, sino hago el post
        const usuarioBD = await this.servicioDelivery.searchUID(
          this.usuario.uid
        );
        console.log(usuarioBD);

        if (usuarioBD.length == 0) {
          //Guardo el Usuario
          await this.servicioDelivery.save(this.usuario, 'usuario');
          //Obtengo el ID Asignado
          this.usuario = await this.servicioDelivery.getMax('usuario');

          //VER SI NO EXISTE CONFLICTOS DE ESTA FORMA, SINO, ASIGNAR UNICAMENTE EL ID
          //Asigno el Usuario al Cliente
          this.cliente.usuario = this.usuario;
          //Guardo el Cliente
          await this.servicioDelivery.save(this.cliente, 'cliente');
        }
      }
    } catch (error) {
      console.error('Error getting user information:', error);
    }
  }

  async agregarAlCarrito(producto: any) {
    if (this.user !== null) {
      await this.carritoService.addItem(producto);
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
    //Obtengo los Articulos Manufacturados
    this.articulosManufacturados = await this.servicioDelivery.get(
      'articuloManufacturado'
    );

    //Ordeno por Rubro
    for (let i = 0; i < this.articulosManufacturados.length; i++) {
      if (this.articulosManufacturados[i].estado == true) {
        if (
          this.articulosManufacturados[i].rubroArticuloManufacturado
            .denominacion == 'Pizzas'
        ) {
          this.pizzas.push(this.articulosManufacturados[i]);
        } else if (
          this.articulosManufacturados[i].rubroArticuloManufacturado
            .denominacion == 'Hamburguesas'
        ) {
          this.hamburguesas.push(this.articulosManufacturados[i]);
        } else if (
          this.articulosManufacturados[i].rubroArticuloManufacturado
            .denominacion == 'Lomos'
        ) {
          this.lomosArray.push(this.articulosManufacturados[i]);
        }
      }
    }
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
