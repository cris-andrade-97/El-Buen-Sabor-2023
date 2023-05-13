import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grilla-articulos-manufacturados',
  templateUrl: './grilla-articulos-manufacturados.component.html',
  styleUrls: ['./grilla-articulos-manufacturados.component.css']
})
export class GrillaArticulosManufacturadosComponent implements OnInit {
  articulosManufacturados: any[] = [];
  articulosBusqueda: any[] = [];
  busqueda: string = "";
  filtro: string = "ninguno";
  filtroRubro: string = "ninguno";
  listaRubros: any[] = [];
  auxiliar: any[] = [];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.obtenerRubros()
    await this.llenarLista()
    this.auxiliar = []
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/articulos-manufacturados/listar';

    this.http.get(url).subscribe((response: any) => {
      this.articulosManufacturados = response.sort((a: { nombre: string; }, b: { nombre: string; }) => a.nombre.localeCompare(b.nombre));
      this.articulosBusqueda = this.articulosManufacturados
    });
  }

  async obtenerRubros() {
    this.http.get('http://localhost:3000/api/rubro-articulos-manufacturados/listar').subscribe(
      (response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.auxiliar.push(response[i]['nombre']);
        }
        this.listaRubros = this.auxiliar.sort((a, b) =>
          a.localeCompare(b)
        )
      }
    )
  }

  async filtrar() {
    switch (this.filtro) {
      case "ninguno":
        switch (this.busqueda) {
          case "" || null:
            if (this.filtroRubro == "ninguno") {
              this.articulosBusqueda = this.articulosManufacturados;
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { rubroArticulo: string; }) => {
                return obj.rubroArticulo == this.filtroRubro;
              })
            }
            break;

          default:
            if (this.filtroRubro == "ninguno") {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { nombre: string; }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
              })
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { nombre: string; rubroArticulo: string; }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.rubroArticulo == this.filtroRubro;
              })
            }
            break;
        }
        break;
      case "vigencia":
        switch (this.busqueda) {
          case "" || null:
            if (this.filtroRubro == "ninguno") {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { rubroArticulo: string; estado: boolean }) => {
                return obj.estado;
              })
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { rubroArticulo: string; estado: boolean }) => {
                return obj.rubroArticulo == this.filtroRubro && obj.estado;
              })
            }
            break;

          default:
            if (this.filtroRubro == "ninguno") {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { nombre: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.estado
              })
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { nombre: string; rubroArticulo: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.rubroArticulo == this.filtroRubro && obj.estado;
              })
            }
            break;
        }
        break;
      case "no-vigencia":
        switch (this.busqueda) {
          case "" || null:
            if (this.filtroRubro == "ninguno") {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { rubroArticulo: string; estado: boolean }) => {
                return !obj.estado;
              })
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { rubroArticulo: string; estado: boolean }) => {
                return obj.rubroArticulo == this.filtroRubro && obj.estado;
              })
            }
            break;

          default:
            if (this.filtroRubro == "ninguno") {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { nombre: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && !obj.estado
              })
            } else {
              this.articulosBusqueda = this.articulosManufacturados.filter((obj: { nombre: string; rubroArticulo: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.rubroArticulo == this.filtroRubro && !obj.estado;
              })
            }
            break;
        }
        break;
    }
  }

  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/articulos-manufacturados/modificar-estado/' + id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
