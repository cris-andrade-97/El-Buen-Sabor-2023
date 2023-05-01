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
      //Si esta todo ok, verifico si es put o post mediante ID
      //POST
      if (this.esNuevo) {
        let url =
          'http://localhost:3000/api/rubro-articulos-manufacturados/nuevo-rubro';

        const data = {
          nombre: this.nombreRubro,
          estado: this.estado,
        };

        this.http.post(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Rubro agregado!');
            window.location.replace('/grilla-rubro-productos');
          }
        });
        return;
      } else {
        //PUT
        let url =
          'http://localhost:3000/api/rubro-articulos-manufacturados//modificar-rubro/' +
          this.id;

        const data = {
          nombre: this.nombreRubro,
          estado: this.estado,
        };

        this.http.put(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Rubro actualizado!');
            window.location.replace('/grilla-rubro-productos');
          }
        });
        return;
      }
    }
  }
}
