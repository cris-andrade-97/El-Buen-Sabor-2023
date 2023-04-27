import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-rubro-productos',
  templateUrl: './formulario-rubro-productos.component.html',
  styleUrls: ['./formulario-rubro-productos.component.css'],
})
export class FormularioRubroProductosComponent implements OnInit {
  nombreRubro: string = '';

  ngOnInit() {}

  muestraNombre() {
    alert(this.nombreRubro);
  }
}
