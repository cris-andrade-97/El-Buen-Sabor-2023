import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnidadMedida } from 'src/app/entidades/UnidadMedida';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-grilla-unidad-de-medida',
  templateUrl: './grilla-unidad-de-medida.component.html',
  styleUrls: ['./grilla-unidad-de-medida.component.css'],
})
export class GrillaUnidadDeMedidaComponent implements OnInit {
  //unidadesMedida: any[] = [];
  busquedaUnidad: UnidadMedida[] = [];
  busqueda: string = '';
  unidadesMedida: UnidadMedida[] = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit(): Promise<void> {
    //this.llenarLista();
    await this.getUnidadesMedida();
  }

  async getUnidadesMedida() {
    this.unidadesMedida = await this.servicioDelivery.getUnidadesMedida();
    this.unidadesMedida.sort((a, b) => {
      if (a.denominacion < b.denominacion) {
        return -1;
      }
      if (a.denominacion > b.denominacion) {
        return 1;
      }
      return 0;
    });

    this.busquedaUnidad = this.unidadesMedida;
  }

  async buscar() {
    if (this.busqueda || this.busqueda != '') {
      this.busquedaUnidad = this.unidadesMedida.filter((obj) => {
        return obj.denominacion
          .toLowerCase()
          .includes(this.busqueda.toLowerCase());
      });
    } else {
      this.busquedaUnidad = this.unidadesMedida;
    }
  }

  // llenarLista() {
  //   let url = 'http://localhost:3000/api/unidad-de-medida/listar';

  //   this.http.get(url).subscribe((response: any) => {
  //     this.unidadesMedida = response.sort(
  //       (a: { nombre: string }, b: { nombre: string }) =>
  //         a.nombre.localeCompare(b.nombre)
  //     );
  //     this.busquedaUnidad = this.unidadesMedida;
  //   });
  // }
}
