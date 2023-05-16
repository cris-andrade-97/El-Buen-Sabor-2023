import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RubroInsumo } from 'src/app/entidades/RubroInsumo';
import { DeliveryService } from 'src/app/services/delivery.service';
//import RubroIngredientesJSON from '../grilla-rubro-ingredientes/RubroIngredientes.json';

//import { lecturaDatos } from 'persistencia/persistencia';

@Component({
  selector: 'app-formulario-rubro-ingredientes',
  templateUrl: './formulario-rubro-ingredientes.component.html',
  styleUrls: ['./formulario-rubro-ingredientes.component.css'],
})
export class FormularioRubroIngredientesComponent implements OnInit {
  esNuevo: boolean = false;
  rubroInsumo: RubroInsumo = new RubroInsumo();
  rubrosInsumos: RubroInsumo[] = [];
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubros
    await this.getRubros();
    //Obtengo Rubro
    await this.getRubroInsumo();
  }

  async getRubroInsumo() {
    //Si es nuevo deja el formulario en blanco
    if (this.id == 'nuevoRubro') {
      this.esNuevo = true;
    } else {
      const id: number = parseInt(this.id || '0', 10);
      this.rubroInsumo = await this.servicioDelivery.getXId('rubroInsumo', id);
    }
  }

  async getRubros() {
    this.rubrosInsumos = await this.servicioDelivery.get('rubroInsumo');
    this.rubrosInsumos.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });
  }

  async post() {
    //Verifico si el nombre está vacio
    if (this.rubroInsumo.denominacion.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay campos vacíos.',
      });
    } else {
      await this.servicioDelivery.save(this.rubroInsumo, 'rubroInsumo');
      if (this.esNuevo) {
        await Swal.fire('Rubro agregado');
        window.location.replace('/grilla-rubro-ingredientes');
      } else {
        await Swal.fire('Rubro Actualizado');
        window.location.replace('/grilla-rubro-ingredientes');
      }
    }
  }
}
