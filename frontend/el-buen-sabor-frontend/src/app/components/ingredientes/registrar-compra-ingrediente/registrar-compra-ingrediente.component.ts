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
  ingredientes: any[] = [];
  ingrediente!: any;
  cantidadActual: number = 0;
  cantidadComprada: number = 0;
  costoCompra: number = 0;
  auxiliar!: any;
  nombre: string = "";
  unidadMedida: string = "gr";
  nuevoCostoPorUnidad: number = 0;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    await this.obtenerIngredientes()
    await this.seleccionarIngrediente()
  }

  async seleccionarIngrediente() {
    this.ingrediente = this.ingredientes.find((obj: { nombre: string; }) => obj.nombre === this.nombre);
    console.log(this.ingrediente)
    this.cantidadActual = this.ingrediente.cantidadActual;
    this.unidadMedida = this.ingrediente.unidadMedida
  }

  actualizarCostoPorUnidad() {
    this.nuevoCostoPorUnidad = this.costoCompra / this.cantidadComprada;
  }

  async obtenerIngredientes() {
    let url = 'http://localhost:3000/api/ingredientes/listar';

    this.http.get(url).subscribe(
      (response) => {
        if (true) {
          this.auxiliar = response
          for (let i = 0; i < this.auxiliar.length; i++) {
            this.ingredientes.push(this.auxiliar[i])
          }
        }
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
        costoPorUnidad: this.costoCompra / this.cantidadComprada
      }

      this.http.put(url, body).subscribe(
        async (response) => {
          if (response) {
            await Swal.fire('Ingrediente actualizado!');
            window.location.replace('/grilla-ingredientes');
          }
        }
      )
      return;
    }
  }
}
