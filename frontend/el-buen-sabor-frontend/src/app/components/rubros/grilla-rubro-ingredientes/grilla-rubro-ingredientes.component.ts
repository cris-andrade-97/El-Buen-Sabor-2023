import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { RubroInsumo } from 'src/app/entidades/RubroInsumo';
import { DeliveryService } from 'src/app/services/delivery.service';
@Component({
  selector: 'app-grilla-rubro-ingredientes',
  templateUrl: './grilla-rubro-ingredientes.component.html',
  styleUrls: ['./grilla-rubro-ingredientes.component.css'],
})
export class GrillaRubroIngredientesComponent implements OnInit {
  busqueda: string = '';
  rubrosInsumos: RubroInsumo[] = [];
  busquedaRubro: RubroInsumo[] = [];
  filtro: string = 'ninguno';

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit() {
    //Traigo los Rubros
    await this.getRubros();
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

    this.busquedaRubro = this.rubrosInsumos;
  }

  async filtrar() {
    switch (this.filtro) {
      case 'ninguno':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubrosInsumos.filter(
            (obj: { denominacion: string }) => {
              return obj.denominacion
                .toLowerCase()
                .includes(this.busqueda.toLowerCase());
            }
          );
        } else {
          this.busquedaRubro = this.rubrosInsumos;
        }
        break;
      case 'vigencia':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubrosInsumos.filter(
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
          this.busquedaRubro = this.rubrosInsumos.filter(
            (obj: { estado: boolean }) => {
              return obj.estado;
            }
          );
        }
        break;
      case 'no-vigencia':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubrosInsumos.filter(
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
          this.busquedaRubro = this.rubrosInsumos.filter(
            (obj: { estado: boolean }) => {
              return !obj.estado;
            }
          );
        }
        break;
      case 'venta':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubrosInsumos.filter(
            (obj: { aLaVenta: boolean; denominacion: string }) => {
              return (
                obj.aLaVenta &&
                obj.denominacion
                  .toLowerCase()
                  .includes(this.busqueda.toLowerCase())
              );
            }
          );
        } else {
          this.busquedaRubro = this.rubrosInsumos.filter(
            (obj: { aLaVenta: boolean }) => {
              return obj.aLaVenta;
            }
          );
        }
        break;
      case 'no-venta':
        if (this.busqueda != '' || this.busqueda) {
          this.busquedaRubro = this.rubrosInsumos.filter(
            (obj: { aLaVenta: boolean; denominacion: string }) => {
              return (
                !obj.aLaVenta &&
                obj.denominacion
                  .toLowerCase()
                  .includes(this.busqueda.toLowerCase())
              );
            }
          );
        } else {
          this.busquedaRubro = this.rubrosInsumos.filter(
            (obj: { aLaVenta: boolean }) => {
              return !obj.aLaVenta;
            }
          );
        }
        break;
    }
  }

  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/rubro-ingredientes/modificar-estado-rubro/' +
      id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
