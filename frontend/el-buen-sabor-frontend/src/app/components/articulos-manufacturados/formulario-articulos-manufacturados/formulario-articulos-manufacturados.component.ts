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
  //articuloManufacturado!: any;
  nombre: string = '';
  unidadMedida: string = '';
  rubroArticulo: string = '';
  imagen: string = '';
  precioVenta: number = 0;
  estado: boolean = false;
  esNuevo: boolean = false;
  listaUnidades: string[] = [];
  //listaIngredientesTotal: ingrediente[] = [];
  //articuloManufacturado.articulosManufacturadoDetalle: ArticuloManufacturadoDetalle[] = [];
  listaRubros: string[] = [];
  auxiliar!: any;
  cantidad: number = 0;
  // ingrediente: NewType = {
  //   id: 0,
  //   nombre: '',
  //   stockMinimoInsumo: 0,
  //   unidadMedida: '',
  //   cantidadActual: 0,
  //   rubroIngrediente: '',
  //   estado: true,
  // };
  costoTotal: number = 0;

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
    await this.calcularCostoTotal();
    await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
    this.auxiliar = null;
  }
  async getRubros() {
    this.rubroArticuloManufacturado = await this.servicioDelivery.get(
      'rubroArticuloManufacturado'
    );
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

  // async obtenerArticulo() {
  //   this.articuloManufacturado = this.http
  //     .get(
  //       'http://localhost:3000/api/articulos-manufacturados/buscar-por-id/' +
  //         this.id
  //     )
  //     .subscribe(async (response) => {
  //       if (this.id == 'nuevoArticulo') {
  //         this.esNuevo = true;
  //         await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  //       } else {
  //         this.articuloManufacturado = response;
  //         this.nombre = this.articuloManufacturado.nombre;
  //         this.imagen = this.articuloManufacturado.imagen;
  //         this.precioVenta = this.articuloManufacturado.precioVenta;
  //         this.rubroArticulo = this.articuloManufacturado.rubroArticulo;
  //         this.estado = this.articuloManufacturado.estado;
  //         this.articuloManufacturadoDetalle =
  //           this.articuloManufacturado.articuloManufacturadoDetalle;
  //         await this.calcularCostoTotal();
  //         await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  //       }
  //     });
  // }

  // async obtenerUnidades() {
  //   this.http
  //     .get('http://localhost:3000/api/unidad-de-medida/listar')
  //     .subscribe((response) => {
  //       this.auxiliar = response;
  //       for (let i = 0; i < this.auxiliar.length; i++) {
  //         this.listaUnidades.push(this.auxiliar[i]['unidad']);
  //       }
  //     });
  // }

  // async obtenerIngredientes() {
  //   this.http
  //     .get('http://localhost:3000/api/ingredientes/listar')
  //     .subscribe((response) => {
  //       this.auxiliar = response;
  //       this.listaIngredientesTotal = [];
  //       for (let i = 0; i < this.auxiliar.length; i++) {
  //         this.listaIngredientesTotal.push(this.auxiliar[i]);
  //       }
  //       this.listaIngredientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
  //     });
  // }

  // async eliminarIngredientesEnArticuloManufacturadoDetalle() {
  //   await this.getInsumos();
  //   this.listaIngredientes = [];
  //   this.listaIngredientes = this.articulosInsumo;

  //   for (let i = 0; i < this.articuloManufacturadoDetalle.length; i++) {
  //     const nombreIngredienteDetalle =
  //       this.articuloManufacturadoDetalle[i].nombre;
  //     for (let j = 0; j < this.listaIngredientes.length; j++) {
  //       const nombreIngredienteLista = this.listaIngredientes[j].nombre;
  //       if (nombreIngredienteDetalle === nombreIngredienteLista) {
  //         this.listaIngredientes.splice(j, 1);
  //         j--;
  //       }
  //     }
  //   }
  // }

  async eliminarIngredientesEnArticuloManufacturadoDetalle() {
    await this.getInsumos();
    this.listaIngredientes = [];
    this.listaIngredientes = this.articulosInsumo;

    for (
      let i = 0;
      i < this.articuloManufacturado.articulosManufacturadoDetalle.length;
      i++
    ) {
      const nombreIngredienteDetalle =
        this.articuloManufacturado.articulosManufacturadoDetalle[i]
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

  async eliminarIngrediente(id: number) {
    for (
      let i = 0;
      i < this.articuloManufacturado.articulosManufacturadoDetalle.length;
      i++
    ) {
      if (
        this.articuloManufacturado.articulosManufacturadoDetalle[i].id == id
      ) {
        this.articuloManufacturado.articulosManufacturadoDetalle.splice(i, 1);
      }
    }
    await this.calcularCostoTotal();
    await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  }

  async agregarIngrediente() {
    for (let i = 0; i < this.listaIngredientes.length; i++) {
      if (
        this.listaIngredientes[i].id == this.nuevoIngrediente.articuloInsumo.id
      ) {
        this.listaIngredientes.splice(i, 1);
        this.articuloManufacturado.articulosManufacturadoDetalle.push(
          this.nuevoIngrediente
        );
        this.nuevoIngrediente = new ArticuloManufacturadoDetalle();
      }
    }
    await this.calcularCostoTotal();
    await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  }

  async calcularCostoTotal() {
    this.costoTotal = 0;
    for (
      let i = 0;
      i < this.articuloManufacturado.articulosManufacturadoDetalle.length;
      i++
    ) {
      this.costoTotal +=
        this.articuloManufacturado.articulosManufacturadoDetalle[i].cantidad *
        this.articuloManufacturado.articulosManufacturadoDetalle[i]
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
        await this.servicioDelivery.save(
          this.articuloManufacturado,
          'articuloManufacturado'
        );
        await Swal.fire('Articulo agregado!');
        window.location.replace('/grilla-articulos-manufacturados');

        return;
      } else {
        await this.servicioDelivery.save(
          this.articuloManufacturado,
          'articuloManufacturado'
        );
        await Swal.fire('Articulo Actualizado!');
        window.location.replace('/grilla-articulos-manufacturados');

        return;
      }
    }
  }
}
