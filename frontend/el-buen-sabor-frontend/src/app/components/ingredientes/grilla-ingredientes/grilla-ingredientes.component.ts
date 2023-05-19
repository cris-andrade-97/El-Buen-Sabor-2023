import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { RubroInsumo } from 'src/app/entidades/RubroInsumo';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-grilla-ingredientes',
  templateUrl: './grilla-ingredientes.component.html',
  styleUrls: ['./grilla-ingredientes.component.css'],
})
export class GrillaIngredientesComponent implements OnInit {
  ingredientesBusqueda: ArticuloInsumo[] = [];
  busqueda: string = '';
  filtro: string = 'ninguno';
  filtroRubro: string = 'ninguno';
  articuloInsumo: ArticuloInsumo[] = [];
  rubrosInsumos: RubroInsumo[] = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit() {
    await this.getInsumos();
    await this.getRubros();
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

  async filtrar() {
    switch (this.filtro) {
      case 'ninguno':
        switch (this.busqueda) {
          case '' || null:
            if (this.filtroRubro == 'ninguno') {
              this.ingredientesBusqueda = this.articuloInsumo;
            } else {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { rubroInsumo: RubroInsumo }) => {
                  return obj.rubroInsumo.denominacion === this.filtroRubro;
                }
              );
            }
            break;

          default:
            if (this.filtroRubro == 'ninguno') {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { denominacion: string }) => {
                  return obj.denominacion
                    .toLowerCase()
                    .includes(this.busqueda.toLowerCase());
                }
              );
            } else {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { denominacion: string; rubroInsumo: RubroInsumo }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) &&
                    obj.rubroInsumo.denominacion == this.filtroRubro
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
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { rubroInsumo: RubroInsumo; estado: boolean }) => {
                  return obj.estado;
                }
              );
            } else {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { rubroInsumo: RubroInsumo; estado: boolean }) => {
                  return (
                    obj.rubroInsumo.denominacion == this.filtroRubro &&
                    obj.estado
                  );
                }
              );
            }
            break;

          default:
            if (this.filtroRubro == 'ninguno') {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { denominacion: string; estado: boolean }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) && obj.estado
                  );
                }
              );
            } else {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: {
                  denominacion: string;
                  rubroInsumo: RubroInsumo;
                  estado: boolean;
                }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) &&
                    obj.rubroInsumo.denominacion == this.filtroRubro &&
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
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { rubroInsumo: RubroInsumo; estado: boolean }) => {
                  return !obj.estado;
                }
              );
            } else {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { rubroInsumo: RubroInsumo; estado: boolean }) => {
                  return (
                    obj.rubroInsumo.denominacion == this.filtroRubro &&
                    obj.estado
                  );
                }
              );
            }
            break;

          default:
            if (this.filtroRubro == 'ninguno') {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: { denominacion: string; estado: boolean }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) && !obj.estado
                  );
                }
              );
            } else {
              this.ingredientesBusqueda = this.articuloInsumo.filter(
                (obj: {
                  denominacion: string;
                  rubroInsumo: RubroInsumo;
                  estado: boolean;
                }) => {
                  return (
                    obj.denominacion
                      .toLowerCase()
                      .includes(this.busqueda.toLowerCase()) &&
                    obj.rubroInsumo.denominacion == this.filtroRubro &&
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
    let url = 'http://localhost:3000/api/ingredientes/modificar-estado/' + id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
