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

  async post() {
    //Verifico si el nombre está vacio
    if (this.nombreRubro.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacio',
      });
    } else {
      //Si esta todo ok hago el post
      let url =
        'http://localhost:3000/api/rubro-articulos-manufacturados/nuevo-rubro';
      const data = {
        nombre: this.nombreRubro,
        estado: this.estado,
      };
      await Swal.fire('EL estado es:' + this.estado);
      this.http.post(url, data).subscribe(async (response) => {
        if (response) {
          await Swal.fire('Rubro agregado!', 'success');
          window.location.replace('/grilla-rubro-productos');
        }
      });
      return;
    }
  }
}
