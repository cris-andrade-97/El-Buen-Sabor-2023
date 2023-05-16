import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DeliveryService } from 'src/app/services/delivery.service';
import { RubroArticuloManufacturado } from 'src/app/entidades/RubroArticuloManufacturado';
@Component({
  selector: 'app-formulario-rubro-productos',
  templateUrl: './formulario-rubro-productos.component.html',
  styleUrls: ['./formulario-rubro-productos.component.css'],
})
export class FormularioRubroProductosComponent implements OnInit {
  esNuevo: boolean = false;
  id = this.route.snapshot.paramMap.get('id');
  rubroArticuloManufacturado: RubroArticuloManufacturado =
    new RubroArticuloManufacturado();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubro
    await this.getRubroArticulo();
  }

  async getRubroArticulo() {
    //Si es nuevo deja el formulario en blanco
    if (this.id == 'nuevoRubro') {
      this.esNuevo = true;
    } else {
      const id: number = parseInt(this.id || '0', 10);
      this.rubroArticuloManufacturado = await this.servicioDelivery.getXId(
        'rubroArticuloManufacturado',
        id
      );
    }
  }

  async post() {
    //Verifico si el nombre está vacio
    if (this.rubroArticuloManufacturado.denominacion.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay campos vacíos.',
      });
    } else {
      await this.servicioDelivery.save(
        this.rubroArticuloManufacturado,
        'rubroArticuloManufacturado'
      );
      if (this.esNuevo) {
        await Swal.fire('Rubro agregado');
        window.location.replace('/grilla-rubro-productos');
      } else {
        await Swal.fire('Rubro Actualizado');
        window.location.replace('/grilla-rubro-productos');
      }
    }
  }
}
