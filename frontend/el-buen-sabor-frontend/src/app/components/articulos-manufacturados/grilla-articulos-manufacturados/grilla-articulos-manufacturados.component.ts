import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { RubroArticuloManufacturado } from 'src/app/entidades/RubroArticuloManufacturado';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-grilla-articulos-manufacturados',
  templateUrl: './grilla-articulos-manufacturados.component.html',
  styleUrls: ['./grilla-articulos-manufacturados.component.css'],
})
export class GrillaArticulosManufacturadosComponent implements OnInit {
  articulosBusqueda: ArticuloManufacturado[] = [];
  busqueda: string = '';
  filtro: string = 'ninguno';
  filtroRubro: string = 'ninguno';
  rubroArticuloManufacturado: RubroArticuloManufacturado[] = [];
  articulosManufacturados: ArticuloManufacturado[] = [];
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit() {
    await this.getRubros();
    await this.getArticulos();
  }

  async getArticulos() {
    this.articulosManufacturados = await this.servicioDelivery.get(
      'articuloManufacturado'
    );
    this.articulosManufacturados.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });
    this.articulosBusqueda = this.articulosManufacturados;
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
  }

  async filtrar() {
    switch (this.filtro) {
      case 'ninguno':
        switch (this.busqueda) {
          case '' || null:
            if (this.filtroRubro == 'ninguno') {
              this.articulosBusqueda = this.articulosManufacturados;
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: { denominacion: string }) => {
                  return obj.denominacion == this.filtroRubro;
                }
              );
            }
            break;

          default:
            if (this.filtroRubro == 'ninguno') {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: { denominacion: string }) => {
                  return obj.denominacion
                    .toLowerCase()
                    .includes(this.busqueda.toLowerCase());
                }
              );
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: {
                  denominacion: string;
                  rubroArticuloManufacturado: RubroArticuloManufacturado;
                }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) &&
                    obj.rubroArticuloManufacturado.denominacion ==
                      this.filtroRubro
                  );
                }
              );
            }
            break;
        }
        break;
      case 'vigencia':
        switch (this.busqueda) {
          case '' || null:
            if (this.filtroRubro == 'ninguno') {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: {
                  rubroArticuloManufacturado: RubroArticuloManufacturado;
                  estado: boolean;
                }) => {
                  return obj.estado;
                }
              );
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: {
                  rubroArticuloManufacturado: RubroArticuloManufacturado;
                  estado: boolean;
                }) => {
                  return (
                    obj.rubroArticuloManufacturado.denominacion ==
                      this.filtroRubro && obj.estado
                  );
                }
              );
            }
            break;

          default:
            if (this.filtroRubro == 'ninguno') {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: { denominacion: string; estado: boolean }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) && obj.estado
                  );
                }
              );
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: {
                  denominacion: string;
                  rubroArticuloManufacturado: RubroArticuloManufacturado;
                  estado: boolean;
                }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) &&
                    obj.rubroArticuloManufacturado.denominacion ==
                      this.filtroRubro &&
                    obj.estado
                  );
                }
              );
            }
            break;
        }
        break;
      case 'no-vigencia':
        switch (this.busqueda) {
          case '' || null:
            if (this.filtroRubro == 'ninguno') {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: {
                  rubroArticuloManufacturado: RubroArticuloManufacturado;
                  estado: boolean;
                }) => {
                  return !obj.estado;
                }
              );
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: {
                  rubroArticuloManufacturado: RubroArticuloManufacturado;
                  estado: boolean;
                }) => {
                  return (
                    obj.rubroArticuloManufacturado.denominacion ==
                      this.filtroRubro && obj.estado
                  );
                }
              );
            }
            break;

          default:
            if (this.filtroRubro == 'ninguno') {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: { denominacion: string; estado: boolean }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) && !obj.estado
                  );
                }
              );
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter(
                (obj: {
                  denominacion: string;
                  rubroArticuloManufacturado: RubroArticuloManufacturado;
                  estado: boolean;
                }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) &&
                    obj.rubroArticuloManufacturado.denominacion ==
                      this.filtroRubro &&
                    !obj.estado
                  );
                }
              );
            }
            break;
        }
        break;
    }
  }

  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/articulos-manufacturados/modificar-estado/' +
      id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
