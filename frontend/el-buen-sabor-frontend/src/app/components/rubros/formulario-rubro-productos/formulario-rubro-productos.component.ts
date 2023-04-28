import { Component, OnInit } from '@angular/core';
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
  rubroIngrediente: any;
  rubro!: UntypedFormGroup;
  esNuevo: boolean = false; 
  nombreRubro: string = '';
  estado: boolean = false;

  constructor(private http: HttpClient){

  }
  
  ngOnInit() {}

  muestraNombre() {
    alert(this.nombreRubro);
  }
}
