import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { CartService } from 'src/app/services/cart-service.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-articulo-manufacturado',
  templateUrl: './detalle-articulo-manufacturado.component.html',
  styleUrls: ['./detalle-articulo-manufacturado.component.css'],
})
export class DetalleArticuloManufacturadoComponent implements OnInit {
  articuloManufacturado!: ArticuloManufacturado;
  id = this.route.snapshot.paramMap.get('id');
  user: any;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private carritoService: CartService,
    private servicioDelivery: DeliveryService,
    public auth: AuthService
  ) {}
  async ngOnInit(): Promise<void> {
    await this.obtenerArticulo();
    this.auth.user$.subscribe(async (user) => {
      if (user) {
        this.user = user;
      }
    });
  }
  async obtenerArticulo() {
    const id: number = parseInt(this.id || '0', 10);
    this.articuloManufacturado = await this.servicioDelivery.getXId(
      'articuloManufacturado',
      id
    );
  }

  async login() {
    this.auth.loginWithRedirect();
  }

  async agregarAlCarrito() {
    if (this.user !== null) {
      this.carritoService.addItem(this.articuloManufacturado);
      await Swal.fire('Producto agregado!');
    } else {
      await Swal.fire(
        'Debe estar logeado para agregar artículos al carrito',
        'Será redireccionado al Log In'
      );
      await this.login();
    }
  }
}
