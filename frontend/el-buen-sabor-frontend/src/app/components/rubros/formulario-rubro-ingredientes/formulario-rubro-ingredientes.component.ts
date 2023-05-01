import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
//import RubroIngredientesJSON from '../grilla-rubro-ingredientes/RubroIngredientes.json';

//import { lecturaDatos } from 'persistencia/persistencia';

@Component({
  selector: 'app-formulario-rubro-ingredientes',
  templateUrl: './formulario-rubro-ingredientes.component.html',
  styleUrls: ['./formulario-rubro-ingredientes.component.css'],
})
export class FormularioRubroIngredientesComponent implements OnInit {
  rubroIngrediente: any;
  esNuevo: boolean = false;
  nombre: string = '';
  estado: boolean = false;
  aLaVenta: boolean = false;

  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubro
    await this.obtenerRubro();
  }

  async obtenerRubro() {
    let url =
      'http://localhost:3000/api/rubro-ingredientes/buscar-por-id/' + this.id;

    this.http.get(url).subscribe((response) => {
      //Si es nuevo deja el formulario en blanco
      if (this.id == 'nuevoRubro') {
        this.esNuevo = true;
      } else {
        //Si es modificación seteo los valores
        this.rubroIngrediente = response;
        this.estado = this.rubroIngrediente.estado;
        this.nombre = this.rubroIngrediente.nombre;
        this.aLaVenta = this.rubroIngrediente.aLaVenta;
      }
    });
  }

  async post() {
    //Verifico si el nombre está vacio
    if (this.nombre.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacio',
      });
    } else {
      //Si esta todo ok, verifico si es put o post mediante ID
      //POST
      if (this.esNuevo) {
        let url = 'http://localhost:3000/api/rubro-ingredientes/nuevo-rubro';

        const data = {
          nombre: this.nombre,
          estado: this.estado,
          aLaVenta: this.aLaVenta,
        };

        this.http.post(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Rubro agregado!');
            window.location.replace('/grilla-rubro-ingredientes');
          }
        });
        return;
      } else {
        //PUT
        let url =
          'http://localhost:3000/api/rubro-ingredientes/modificar-rubro/' +
          this.id;

        const data = {
          nombre: this.nombre,
          estado: this.estado,
          aLaVenta: this.aLaVenta,
        };

        this.http.put(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Rubro actualizado!');
            window.location.replace('/grilla-rubro-ingredientes');
          }
        });
        return;
      }
    }
  }

  onSubmit() {
    window.location.replace('/grilla-rubro-ingredientes');
  }
}
