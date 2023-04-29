import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  validaSeVende() {
    if (this.estado == true) {
      this.estado = true;
      return true;
    }
    return false;
  }

  validaALaVenta() {
    if (this.aLaVenta == true) {
      this.aLaVenta = true;
      return true;
    }
    return false;
  }

  onSubmit() {
    window.location.replace('/grilla-rubro-ingredientes');
  }
}
