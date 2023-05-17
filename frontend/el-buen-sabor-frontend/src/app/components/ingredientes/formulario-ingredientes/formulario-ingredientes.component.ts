import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { DeliveryService } from 'src/app/services/delivery.service';
import { RubroInsumo } from 'src/app/entidades/RubroInsumo';
import { UnidadMedida } from 'src/app/entidades/UnidadMedida';

@Component({
  selector: 'app-formulario-ingredientes',
  templateUrl: './formulario-ingredientes.component.html',
  styleUrls: ['./formulario-ingredientes.component.css'],
})
export class FormularioIngredientesComponent implements OnInit {
  esNuevo: boolean = false;
  articuloInsumo: ArticuloInsumo = new ArticuloInsumo();
  rubrosInsumos: RubroInsumo[] = [];
  unidadesMedida: UnidadMedida[] = [];
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit() {
    await this.getRubros();
    await this.getUnidadesMedida();
    await this.getArticuloInsumo();
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

  async getUnidadesMedida() {
    this.unidadesMedida = await this.servicioDelivery.get('unidadMedida');
    this.unidadesMedida.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });
  }

  async getArticuloInsumo() {
    //Si es nuevo deja el formulario en blanco
    if (this.id == 'nuevoIngrediente') {
      this.esNuevo = true;
    } else {
      const id: number = parseInt(this.id || '0', 10);
      this.articuloInsumo = await this.servicioDelivery.getXId(
        'articuloInsumo',
        id
      );
    }
  }

  async post() {
    if (this.articuloInsumo.denominacion.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacio',
      });
    } else if (this.articuloInsumo.stockMinimo <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El stock mínimo debe ser mayor a cero',
      });
    } else if (!this.articuloInsumo.unidadMedida) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione una unidad de medida',
      });
    } else if (!this.articuloInsumo.rubroInsumo) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione un rubro',
      });
    } else {
      if (this.esNuevo) {
        await this.servicioDelivery.save(this.articuloInsumo, 'articuloInsumo');
        await Swal.fire('Insumo agregado!');
        window.location.replace('/grilla-ingredientes');
        return;
      } else {
        await this.servicioDelivery.save(this.articuloInsumo, 'articuloInsumo');
        await Swal.fire('Insumo actualizado!');
        window.location.replace('/grilla-ingredientes');
        return;
      }
    }
  }
}
