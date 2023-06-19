import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { ArticuloManufacturadoDetalle } from 'src/app/entidades/ArticuloManufacturadoDetalle';
import { RubroArticuloManufacturado } from 'src/app/entidades/RubroArticuloManufacturado';
import { DeliveryService } from 'src/app/services/delivery.service';
import Swal from 'sweetalert2';

// interface ArticuloManufacturadoDetalle {
//   id: number;
//   nombre: string;
//   cantidad: number;
//   unidadDeMedida: string;
//   costoIngrediente: number;
// }
// interface ingrediente {
//   id: number;
//   nombre: string;
//   stockMinimoInsumo: number;
//   unidadMedida: string;
//   cantidadActual: number;
//   rubroIngrediente: string;
//   estado: true;
// }

// type NewType = ingrediente;

@Component({
  selector: 'app-formulario-articulos-manufacturados',
  templateUrl: './formulario-articulos-manufacturados.component.html',
  styleUrls: ['./formulario-articulos-manufacturados.component.css'],
})
export class FormularioArticulosManufacturadosComponent implements OnInit {
  nombre: string = '';
  unidadMedida: string = '';
  rubroArticulo: string = '';
  imagen: string = '';
  precioVenta: number = 0;
  estado: boolean = false;
  esNuevo: boolean = false;
  listaUnidades: string[] = [];
  listaRubros: string[] = [];
  auxiliar!: any;
  cantidad: number = 0;
  costoTotal: number = 0;

  listaConID: ArticuloManufacturadoDetalle[] = [];
  nuevoIngrediente: ArticuloManufacturadoDetalle =
    new ArticuloManufacturadoDetalle();
  listaIngredientes: ArticuloInsumo[] = [];
  articulosInsumo: ArticuloInsumo[] = [];
  rubroArticuloManufacturado: RubroArticuloManufacturado[] = [];
  articuloManufacturado: ArticuloManufacturado = new ArticuloManufacturado();
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit() {
    await this.getRubros();
    await this.getInsumos();
    this.listaIngredientes = this.articulosInsumo;
    await this.getArticuloManufacturado();
    if (this.articuloManufacturado.articuloManufacturadoDetalles) {
      await this.calcularCostoTotal();
      await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
    }
  }
  async getRubros() {
    //Obtengo los rubros
    this.rubroArticuloManufacturado = await this.servicioDelivery.get(
      'rubroArticuloManufacturado'
    );
    //Ordeno alfabeticamente
    this.rubroArticuloManufacturado.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });
  }

  async getInsumos() {
    //Obtengo los insumos
    this.articulosInsumo = await this.servicioDelivery.get('articuloInsumo');
    //Ordeno alfabeticamente
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

  async getArticuloManufacturado() {
    //Si es nuevo deja el formulario en blanco
    if (this.id == 'nuevoArticulo') {
      this.esNuevo = true;
    } else {
      const id: number = parseInt(this.id || '0', 10);
      this.articuloManufacturado = await this.servicioDelivery.getXId(
        'articuloManufacturado',
        id
      );
    }
  }

  async eliminarIngredientesEnArticuloManufacturadoDetalle() {
    await this.getInsumos();
    this.listaIngredientes = [];
    this.listaIngredientes = this.articulosInsumo;

    for (
      let i = 0;
      i < this.articuloManufacturado.articuloManufacturadoDetalles.length;
      i++
    ) {
      const nombreIngredienteDetalle =
        this.articuloManufacturado.articuloManufacturadoDetalles[i]
          .articuloInsumo.denominacion;
      for (let j = 0; j < this.listaIngredientes.length; j++) {
        const nombreIngredienteLista = this.listaIngredientes[j].denominacion;
        if (nombreIngredienteDetalle === nombreIngredienteLista) {
          this.listaIngredientes.splice(j, 1);
          j--;
        }
      }
    }
  }

  async eliminarIngrediente(detalle: ArticuloManufacturadoDetalle) {
    for (
      let i = 0;
      i < this.articuloManufacturado.articuloManufacturadoDetalles.length;
      i++
    ) {
      if (
        this.articuloManufacturado.articuloManufacturadoDetalles[i] == detalle
      ) {
        this.articuloManufacturado.articuloManufacturadoDetalles.splice(i, 1);
      }
    }
    await this.calcularCostoTotal();
    await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  }

  async agregarIngrediente() {
    //Elimino el ArticuloInsumo de la lista que se muestra en el ComboBox
    for (let i = 0; i < this.listaIngredientes.length; i++) {
      if (
        this.listaIngredientes[i].id == this.nuevoIngrediente.articuloInsumo.id
      ) {
        this.listaIngredientes.splice(i, 1);

        //Asigno el articulo manufactuardo al nuevo ingrediente
        if (this.articuloManufacturado.id > 0) {
          this.nuevoIngrediente.articuloManufacturado.id =
            this.articuloManufacturado.id;
        }
        //Si no tiene detalles lo inicializo, sino hago directamente el push
        if (!this.articuloManufacturado.articuloManufacturadoDetalles) {
          this.articuloManufacturado.articuloManufacturadoDetalles = [];
          this.articuloManufacturado.articuloManufacturadoDetalles.push(
            this.nuevoIngrediente
          );
          this.nuevoIngrediente = new ArticuloManufacturadoDetalle();
        } else {
          this.articuloManufacturado.articuloManufacturadoDetalles.push(
            this.nuevoIngrediente
          );
          this.nuevoIngrediente = new ArticuloManufacturadoDetalle();
        }
      }
    }
    await this.calcularCostoTotal();
    await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  }

  async calcularCostoTotal() {
    this.costoTotal = 0;
    for (
      let i = 0;
      i < this.articuloManufacturado.articuloManufacturadoDetalles.length;
      i++
    ) {
      this.costoTotal +=
        this.articuloManufacturado.articuloManufacturadoDetalles[i].cantidad *
        this.articuloManufacturado.articuloManufacturadoDetalles[i]
          .articuloInsumo.precioCostoXUnidad;
    }
    this.costoTotal = parseFloat(this.costoTotal.toFixed(2));
    return this.costoTotal;
  }

  async post() {
    if (this.articuloManufacturado.imagen.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La imagen no puede estar vacia',
      });
    }
    if (this.articuloManufacturado.denominacion.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacio',
      });
    } else {
      this.articuloManufacturado.precioCosto = this.costoTotal;
      if (this.esNuevo) {
        //Extraigo detalles
        let ingredientes: ArticuloManufacturadoDetalle[] =
          this.articuloManufacturado.articuloManufacturadoDetalles;
        this.articuloManufacturado.articuloManufacturadoDetalles = [];
        //Guardo el artículo
        await this.servicioDelivery.save(
          this.articuloManufacturado,
          'articuloManufacturado'
        );
        //Obtengo el ID Asignado
        this.articuloManufacturado = await this.servicioDelivery.getMax(
          'articuloManufacturado'
        );
        console.log('el id que se obtiene: ' + this.articuloManufacturado.id);

        //Recorro el array de datalles
        for (let i = 0; i < ingredientes.length; i++) {
          //Asigno el id del articuloManufacturado a cada detalle
          ingredientes[i].articuloManufacturado.id =
            this.articuloManufacturado.id;
          console.log('el id que se asigna: ' + this.articuloManufacturado.id);
          console.log(JSON.stringify(ingredientes[i]));

          //guardo cada detalle
          await this.servicioDelivery.save(
            ingredientes[i],
            'articuloManufacturadoDetalle'
          );
        }
        await Swal.fire('Articulo agregado!');
        window.location.replace('/grilla-articulos-manufacturados');

        return;
      } else {
        //Extraigo detalles
        let ingredientes: ArticuloManufacturadoDetalle[] =
          this.articuloManufacturado.articuloManufacturadoDetalles;
        this.articuloManufacturado.articuloManufacturadoDetalles = [];
        //Guardo el artículo
        await this.servicioDelivery.save(
          this.articuloManufacturado,
          'articuloManufacturado'
        );
        this.articuloManufacturado.articuloManufacturadoDetalles = ingredientes;
        //Si no es nuevo, recorro el array de detalles
        for (
          let i = 0;
          i < this.articuloManufacturado.articuloManufacturadoDetalles.length;
          i++
        ) {
          //guardo cada detalle
          await this.servicioDelivery.save(
            this.articuloManufacturado.articuloManufacturadoDetalles[i],
            'articuloManufacturadoDetalle'
          );
        }

        await Swal.fire('Articulo Actualizado!');
        window.location.replace('/grilla-articulos-manufacturados');

        return;
      }
    }
  }
}
