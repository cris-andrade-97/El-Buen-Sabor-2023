import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import RubroIngredientesJSON from '../grilla-rubro-ingredientes/RubroIngredientes.json';

//import { lecturaDatos } from 'persistencia/persistencia';

@Component({
  selector: 'app-formulario-rubro-ingredientes',
  templateUrl: './formulario-rubro-ingredientes.component.html',
  styleUrls: ['./formulario-rubro-ingredientes.component.css'],
})
export class FormularioRubroIngredientesComponent implements OnInit {
  rubro!: UntypedFormGroup;
  esNuevo: boolean = false;
  rubroIngrediente!: any;
  nombre: string = '';
  estado: boolean = false;

  id = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private fb: UntypedFormBuilder) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubro
    this.rubroIngrediente = RubroIngredientesJSON['rubro-ingredientes'].filter(obj => obj.id == Number(this.id))[0];

    //Si es nuevo deja el formulario en blanco
    if (this.id == 'nuevoRubro') {
      this.esNuevo = true;
    } else {
      //Si es modificación seteo los valores
      this.estado = this.rubroIngrediente.estado;
      this.nombre = this.rubroIngrediente.nombre;
    }

    console.log(this.estado)    

  }

  validaSeVende() {
    if (this.estado == true) {
      this.estado = true;
      return true;
    }
    return false;
  }

  asignarEstado(estadoRubro: boolean) {
    this.estado = estadoRubro;
  }

  onSubmit() {   
    window.location.replace('/grilla-rubro-ingredientes');
  }
}
