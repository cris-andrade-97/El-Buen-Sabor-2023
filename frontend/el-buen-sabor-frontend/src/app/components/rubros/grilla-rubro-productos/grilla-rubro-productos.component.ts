import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { RubroArticuloManufacturado } from 'src/app/entidades/RubroArticuloManufacturado';
import { DeliveryService } from 'src/app/services/delivery.service';
@Component({
  selector: 'app-grilla-rubro-productos',
  templateUrl: './grilla-rubro-productos.component.html',
  styleUrls: ['./grilla-rubro-productos.component.css'],
})
export class GrillaRubroProductosComponent implements OnInit {
  busquedaRubro: RubroArticuloManufacturado[] = [];
  busqueda: string = '';
  filtro: string = 'ninguno';
  rubroArticuloManufacturado: RubroArticuloManufacturado[] = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit() {
    await this.getRubros();
  }

  async getRubros() {
    this.rubroArticuloManufacturado = await this.servicioDelivery.get(
      'rubroArticuloManufacturado'
    );
    this.rubroArticuloManufacturado.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });

    this.busquedaRubro = this.rubroArticuloManufacturado;
  }

  async filtrar() {
    switch (this.filtro) {
      case 'ninguno':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubroArticuloManufacturado.filter(
            (obj: { denominacion: string }) => {
              return obj.denominacion
                .toLowerCase()
                .includes(this.busqueda.toLowerCase());
            }
          );
        } else {
          this.busquedaRubro = this.rubroArticuloManufacturado;
        }
        break;
      case 'vigencia':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubroArticuloManufacturado.filter(
            (obj: { estado: boolean; denominacion: string }) => {
              return (
                obj.estado &&
                obj.denominacion
                  .toLowerCase()
                  .includes(this.busqueda.toLowerCase())
              );
            }
          );
        } else {
          this.busquedaRubro = this.rubroArticuloManufacturado.filter(
            (obj: { estado: boolean }) => {
              return obj.estado;
            }
          );
        }
        break;
      case 'no-vigencia':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubroArticuloManufacturado.filter(
            (obj: { estado: boolean; denominacion: string }) => {
              return (
                !obj.estado &&
                obj.denominacion
                  .toLowerCase()
                  .includes(this.busqueda.toLowerCase())
              );
            }
          );
        } else {
          this.busquedaRubro = this.rubroArticuloManufacturado.filter(
            (obj: { estado: boolean }) => {
              return !obj.estado;
            }
          );
        }
        break;
    }
  }

  async actualizarVigencia(rubro: RubroArticuloManufacturado, estado: boolean) {
    this.spinner.show();
    //cambio estado
    rubro.estado = estado;

    //Guardo el artículo
    await this.servicioDelivery.save(rubro, 'rubroArticuloManufacturado');

    window.location.reload();
  }
}
