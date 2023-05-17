import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';

@Component({
  selector: 'app-control-stock-ingredientes',
  templateUrl: './control-stock-ingredientes.component.html',
  styleUrls: ['./control-stock-ingredientes.component.css'],
})
export class ControlStockIngredientesComponent {
  ingredientes: any[] = [];
  ingredientesBusqueda: ArticuloInsumo[] = [];
  ingredientesConStockBajo!: any;
  busqueda: string = '';
  articuloInsumo: ArticuloInsumo[] = [];

  constructor(private servicioDelivery: DeliveryService) {}

  async ngOnInit() {
    await this.getInsumos();
  }

  async getInsumos() {
    this.articuloInsumo = await this.servicioDelivery.get('articuloInsumo');
    this.articuloInsumo.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });
    this.ingredientesBusqueda = this.articuloInsumo;
  }

  async buscar() {
    if (this.busqueda != '' || this.busqueda) {
      this.ingredientesBusqueda = this.articuloInsumo.filter(
        (obj: { denominacion: string }) => {
          return obj.denominacion
            .toLowerCase()
            .includes(this.busqueda.toLowerCase());
        }
      );
    } else {
      this.ingredientesBusqueda = this.articuloInsumo;
    }
  }
}
