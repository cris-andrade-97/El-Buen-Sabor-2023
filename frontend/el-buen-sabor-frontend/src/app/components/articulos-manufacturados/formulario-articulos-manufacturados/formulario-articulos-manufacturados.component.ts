import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

interface ArticuloManufacturadoDetalle {
  id: number;
  nombre: string;
  cantidad: number;
  unidadDeMedida: string;
  costoIngrediente: number;
}
interface ingrediente {
  id: number;
  nombre: string;
  stockMinimoInsumo: number;
  unidadMedida: string;
  cantidadActual: number;
  rubroIngrediente: string;
  estado: true;
}

type NewType = ingrediente;

@Component({
  selector: 'app-formulario-articulos-manufacturados',
  templateUrl: './formulario-articulos-manufacturados.component.html',
  styleUrls: ['./formulario-articulos-manufacturados.component.css'],
})
export class FormularioArticulosManufacturadosComponent implements OnInit {
  articuloManufacturado!: any;
  nombre: string = '';
  unidadMedida: string = '';
  rubroArticulo: string = '';
  imagen: string = '';
  precioVenta: number = 0;
  estado: boolean = false;
  esNuevo: boolean = false;
  listaUnidades: string[] = [];
  listaIngredientes: any[] = [];
  listaIngredientesTotal: ingrediente[] = [];
  articuloManufacturadoDetalle: ArticuloManufacturadoDetalle[] = [];
  listaRubros: string[] = [];
  auxiliar!: any;
  cantidad: number = 0;
  ingrediente: NewType = {
    id: 0,
    nombre: '',
    stockMinimoInsumo: 0,
    unidadMedida: '',
    cantidadActual: 0,
    rubroIngrediente: '',
    estado: true,
  };
  costoTotal: number = 0;

  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    await this.obtenerRubros();
    await this.obtenerUnidades();
    await this.obtenerIngredientes();
    await this.obtenerArticulo();
    this.auxiliar = null;
  }

  async obtenerArticulo() {
    this.articuloManufacturado = this.http
      .get(
        'http://localhost:3000/api/articulos-manufacturados/buscar-por-id/' +
          this.id
      )
      .subscribe(async (response) => {
        if (this.id == 'nuevoArticulo') {
          this.esNuevo = true;
          await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
        } else {
          this.articuloManufacturado = response;
          this.nombre = this.articuloManufacturado.nombre;
          this.imagen = this.articuloManufacturado.imagen;
          this.precioVenta = this.articuloManufacturado.precioVenta;
          this.rubroArticulo = this.articuloManufacturado.rubroArticulo;
          this.estado = this.articuloManufacturado.estado;
          this.articuloManufacturadoDetalle =
            this.articuloManufacturado.articuloManufacturadoDetalle;
          await this.calcularCostoTotal();
          await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
        }
      });
  }

  async obtenerUnidades() {
    this.http
      .get('http://localhost:3000/api/unidad-de-medida/listar')
      .subscribe((response) => {
        this.auxiliar = response;
        for (let i = 0; i < this.auxiliar.length; i++) {
          this.listaUnidades.push(this.auxiliar[i]['unidad']);
        }
      });
  }

  async obtenerIngredientes() {
    this.http
      .get('http://localhost:3000/api/ingredientes/listar')
      .subscribe((response) => {
        this.auxiliar = response;
        this.listaIngredientesTotal = [];
        for (let i = 0; i < this.auxiliar.length; i++) {
          this.listaIngredientesTotal.push(this.auxiliar[i]);
        }
        this.listaIngredientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
      });
  }

  async eliminarIngredientesEnArticuloManufacturadoDetalle() {
    await this.obtenerIngredientes();
    this.listaIngredientes = [];
    this.listaIngredientes = this.listaIngredientesTotal;

    for (let i = 0; i < this.articuloManufacturadoDetalle.length; i++) {
      const nombreIngredienteDetalle =
        this.articuloManufacturadoDetalle[i].nombre;
      for (let j = 0; j < this.listaIngredientes.length; j++) {
        const nombreIngredienteLista = this.listaIngredientes[j].nombre;
        if (nombreIngredienteDetalle === nombreIngredienteLista) {
          this.listaIngredientes.splice(j, 1);
          j--;
        }
      }
    }
  }

  async eliminarIngrediente(id: number) {
    for (let i = 0; i < this.articuloManufacturadoDetalle.length; i++) {
      if (this.articuloManufacturadoDetalle[i].id == id) {
        this.articuloManufacturadoDetalle.splice(i, 1);
      }
    }
    await this.calcularCostoTotal();
    await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  }

  async agregarIngrediente(id: number) {
    let numero = this.articuloManufacturadoDetalle.length + 1;
    for (let i = 0; i < this.listaIngredientes.length; i++) {
      if (this.listaIngredientes[i].id == id) {
        const nuevoDetalle: ArticuloManufacturadoDetalle = {
          id: numero,
          nombre: this.listaIngredientes[i].nombre,
          cantidad: this.cantidad,
          unidadDeMedida: this.listaIngredientes[i].unidadMedida,
          costoIngrediente:
            this.cantidad * this.listaIngredientes[i].costoPorUnidad,
        };
        this.listaIngredientes.splice(i, 1);
        this.articuloManufacturadoDetalle.push(nuevoDetalle);
        this.cantidad = 0;
      }
    }
    await this.calcularCostoTotal();
    await this.eliminarIngredientesEnArticuloManufacturadoDetalle();
  }

  async obtenerRubros() {
    this.http
      .get('http://localhost:3000/api/rubro-articulos-manufacturados/listar')
      .subscribe((response) => {
        this.auxiliar = response;
        for (let i = 0; i < this.auxiliar.length; i++) {
          this.listaRubros.push(this.auxiliar[i]['nombre']);
        }
      });
  }

  async calcularCostoTotal() {
    this.costoTotal = 0;
    for (let i = 0; i < this.articuloManufacturadoDetalle.length; i++) {
      this.costoTotal += this.articuloManufacturadoDetalle[i].costoIngrediente;
    }
    return this.costoTotal;
  }

  async post() {
    if (this.imagen.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La imagen no puede estar vacia',
      });
    }
    if (this.nombre.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacio',
      });
    } else {
      let costoTotal: number = await this.calcularCostoTotal();
      if (this.esNuevo) {
        let url = 'http://localhost:3000/api/articulos-manufacturados/nuevo';

        const data = {
          nombre: this.nombre,
          precioVenta: this.precioVenta,
          imagen: this.imagen,
          estado: this.estado,
          rubroArticulo: this.rubroArticulo,
          articuloManufacturadoDetalle: this.articuloManufacturadoDetalle,
          costoTotal: costoTotal,
        };

        this.http.post(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Articulo agregado!');
            window.location.replace('/grilla-articulos-manufacturados');
          }
        });
        return;
      } else {
        let url =
          'http://localhost:3000/api/articulos-manufacturados/modificar-todo/' +
          this.id;

        const data = {
          nombre: this.nombre,
          precioVenta: this.precioVenta,
          imagen: this.imagen,
          estado: this.estado,
          rubroArticulo: this.rubroArticulo,
          articuloManufacturadoDetalle: this.articuloManufacturadoDetalle,
          costoTotal: costoTotal,
        };

        this.http.put(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Articulo actualizado!');
            window.location.replace('/grilla-articulos-manufacturados');
          }
        });
        return;
      }
    }
  }

  onSubmit() {
    window.location.replace('/grilla-ingredientes');
  }
}
