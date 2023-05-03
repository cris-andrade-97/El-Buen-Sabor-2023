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
  selector: 'app-formulario-ingredientes',
  templateUrl: './formulario-ingredientes.component.html',
  styleUrls: ['./formulario-ingredientes.component.css']
})
export class FormularioIngredientesComponent implements OnInit {
  ingrediente!: any;
  nombre: string = "";
  unidadMedida: string = "";
  rubro: string = "";
  cantidadActual: number = 0;
  stockMinimo: number = 0;
  costoPorUnidad: number = 0;
  estado: boolean = false;
  esNuevo: boolean = false;
  listaUnidades: string[] = [];
  listaRubros: string[] = [];
  auxiliar!: any;

  id = this.route.snapshot.paramMap.get('id')

  constructor(private route: ActivatedRoute, private fb: UntypedFormBuilder, private http: HttpClient) { }

  async ngOnInit() {
    await this.obtenerRubros()
    await this.obtenerUnidades()
    await this.obtenerIngrediente()
    this.auxiliar = null;
  }

  async obtenerIngrediente() {
    this.ingrediente = this.http.get('http://localhost:3000/api/ingredientes/buscar-por-id/' + this.id)
      .subscribe((response) => {
        if (this.id == "nuevoIngrediente") {
          this.esNuevo = true
          this.unidadMedida = "gr"
          this.rubro = "Vegetales"
        } else {
          this.ingrediente = response;
          this.nombre = this.ingrediente.nombre;
          this.cantidadActual = this.ingrediente.cantidadActual;
          this.stockMinimo = this.ingrediente.stockMinimoInsumo;
          this.unidadMedida = this.ingrediente.unidadMedida;
          this.rubro = this.ingrediente.rubroIngrediente;
          this.estado = this.ingrediente.estado;
          this.costoPorUnidad = this.ingrediente.costoPorUnidad
        }
      }
      )
  }

  async obtenerUnidades() {
    this.http.get('http://localhost:3000/api/unidad-de-medida/listar').subscribe(
      (response) => {
        this.auxiliar = response
        for (let i = 0; i < this.auxiliar.length; i++) {
          this.listaUnidades.push(this.auxiliar[i]['unidad']);
        }
      }
    )
  }

  async obtenerRubros() {
    this.http.get('http://localhost:3000/api/rubro-ingredientes/listar').subscribe(
      (response) => {
        this.auxiliar = response
        for (let i = 0; i < this.auxiliar.length; i++) {
          this.listaRubros.push(this.auxiliar[i]['nombre']);
        }
      }
    )
  }

  async post() {
    const data = {
      "nombre": this.nombre,
      "stockMinimoInsumo": this.stockMinimo,
      "unidadMedida": this.unidadMedida,
      "cantidadActual": this.cantidadActual,
      "rubroIngrediente": this.rubro,
      "estado": this.estado,
      "costoPorUnidad": this.costoPorUnidad
    };

    if (this.nombre.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacio',
      });
    } else {
      if (this.esNuevo) {
        let url = 'http://localhost:3000/api/ingredientes/nuevo';
        this.http.post(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Ingrediente agregado!');
            window.location.replace('/grilla-ingredientes');
          }
        });
        return;
      } else {
        let url = 'http://localhost:3000/api/ingredientes/modificar-todo/' + this.id;
        this.http.put(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Ingrediente actualizado!');
            window.location.replace('/grilla-ingredientes');
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
