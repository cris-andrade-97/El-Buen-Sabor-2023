import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';

@Component({
  selector: 'app-registrar-compra-ingrediente',
  templateUrl: './registrar-compra-ingrediente.component.html',
  styleUrls: ['./registrar-compra-ingrediente.component.css'],
})
export class RegistrarCompraIngredienteComponent implements OnInit {
  ingredientes: any[] = [];
  ingrediente!: any;
  cantidadActual: number = 0;
  cantidadComprada: number = 0;
  costoCompra: number = 0;
  auxiliar!: any;
  nombre: string = '';
  unidadMedida: string = 'gr';
  nuevoCostoPorUnidad: number = 0;
  id = this.route.snapshot.paramMap.get('id');
  articuloInsumo: ArticuloInsumo = new ArticuloInsumo();
  articulosInsumo: ArticuloInsumo[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit() {
    if (!this.id) {
      await this.getArticulosInsumos();
      //await this.seleccionarIngrediente();
    } else {
      await this.getArticuloInsumo();
    }
  }

  async getArticuloInsumo() {
    const id: number = parseInt(this.id || '0', 10);
    this.articuloInsumo = await this.servicioDelivery.getXId(
      'articuloInsumo',
      id
    );
  }

  async actualizaCosto() {
    this.articuloInsumo.precioCostoXUnidad =
      this.costoCompra / this.cantidadComprada;
    this.articuloInsumo.precioCostoXUnidad = parseFloat(
      this.articuloInsumo.precioCostoXUnidad.toFixed(2)
    );
  }

  async getArticulosInsumos() {
    this.articulosInsumo = await this.servicioDelivery.get('articuloInsumo');
    this.articulosInsumo.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });
  }

  async post() {
    if (this.cantidadComprada <= 0 || this.costoCompra <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No pueden haber campos negativos o nulos',
      });
    } else {
      this.articuloInsumo.stockActual += this.cantidadComprada;
      await this.servicioDelivery.save(this.articuloInsumo, 'articuloInsumo');
      await Swal.fire('Ingrediente actualizado!');
      window.location.replace('/grilla-ingredientes');
      return;
    }
  }
}
