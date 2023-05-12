import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-compra-ingrediente',
  templateUrl: './registrar-compra-ingrediente.component.html',
  styleUrls: ['./registrar-compra-ingrediente.component.css']
})
export class RegistrarCompraIngredienteComponent implements OnInit {
  ingrediente!: any;
  cantidadActual: number = 0;
  cantidadComprada: number = 0;
  costoCompra: number = 0;
  nombre: string = "";
  unidadMedida: string = "";
  nuevoCostoPorUnidad: number = 0;
  id = this.route.snapshot.paramMap.get('id')

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.obtenerIngrediente()   
  }

  actualizarCostoPorUnidad() {
    this.nuevoCostoPorUnidad = this.costoCompra / this.cantidadComprada;
  }

  async obtenerIngrediente() {
    let url = 'http://localhost:3000/api/ingredientes/buscar-por-id/' + this.id;

    this.http.get(url).subscribe(
      (response) => {
        this.ingrediente = response
        this.nombre = this.ingrediente.nombre
        this.cantidadActual = this.ingrediente.cantidadActual;
        this.unidadMedida = this.ingrediente.unidadMedida;
      }
    );
  }

  async post() {

    if (this.cantidadComprada <= 0 || this.costoCompra <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No pueden haber campos negativos o nulos',
      });
    } else {
      let url = 'http://localhost:3000/api/ingredientes/registrar-compra/' + this.ingrediente.id;

      const body = {
        cantidadActual: this.cantidadActual + this.cantidadComprada,
        costoPorUnidad: this.nuevoCostoPorUnidad
      }

      this.http.put(url, body).subscribe(
        async (response) => {
          if (response) {
            await Swal.fire('Ingrediente actualizado!');
            window.location.replace('/control-stock-ingredientes');
          }
        }
      )
      return;
    }
  }
}
