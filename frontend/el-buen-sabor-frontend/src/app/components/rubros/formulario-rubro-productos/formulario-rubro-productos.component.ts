import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-formulario-rubro-productos',
  templateUrl: './formulario-rubro-productos.component.html',
  styleUrls: ['./formulario-rubro-productos.component.css'],
})
export class FormularioRubroProductosComponent implements OnInit {
  rubroProducto: any;
  esNuevo: boolean = false;
  nombreRubro: string = '';
  estado: boolean = false;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubro
    await this.obtenerRubro();
  }

  async obtenerRubro() {
    let url =
      'http://localhost:3000/api/rubro-articulos-manufacturados/buscar-por-id/' +
      this.id;

    this.http.get(url).subscribe((response) => {
      //Si es nuevo deja el formulario en blanco
      if (this.id == 'nuevoRubro') {
        this.esNuevo = true;
      } else {
        //Si es modificación seteo los valores
        this.rubroProducto = response;
        this.estado = this.rubroProducto.estado;
        this.nombreRubro = this.rubroProducto.nombre;
      }
    });
  }

  validaSeVende() {
    if (this.estado == true) {
      this.estado = true;
      return true;
    }
    return false;
  }

  onSubmit() {
    window.location.replace('/grilla-rubro-ingredientes');
  }
}
