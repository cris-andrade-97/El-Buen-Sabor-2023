import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-grilla-rubro-ingredientes',
  templateUrl: './grilla-rubro-ingredientes.component.html',
  styleUrls: ['./grilla-rubro-ingredientes.component.css'],
})
export class GrillaRubroIngredientesComponent implements OnInit {
  busqueda: string = "";
  rubrosIngredientes: any[] = [];
  busquedaRubro: any[] = [];
  filtro: string = "ninguno";

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista();
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/rubro-ingredientes/listar';

    this.http.get(url).subscribe((response: any) => {
      this.rubrosIngredientes = response.sort((a: { nombre: string; }, b: { nombre: any; }) => a.nombre.localeCompare(b.nombre));;
      this.busquedaRubro = this.rubrosIngredientes
    });
  }

  async filtrar() {
    switch (this.filtro) {
      case "ninguno":
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { nombre: string; }) => {
            return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          })
        } else {
          this.busquedaRubro = this.rubrosIngredientes;
        }
        break;
      case "vigencia":
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { estado: boolean; nombre: string }) => {
            return obj.estado && obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          })
        } else {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { estado: boolean; }) => {
            return obj.estado;
          });
        }
        break;
      case "no-vigencia":
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { estado: boolean; nombre: string }) => {
            return !obj.estado && obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          });
        } else {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { estado: boolean; }) => {
            return !obj.estado;
          });
        }
        break;
      case "venta":
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { aLaVenta: boolean; nombre: string }) => {
            return obj.aLaVenta && obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          });
        } else {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { aLaVenta: boolean; }) => {
            return obj.aLaVenta;
          });
        }
        break;
      case "no-venta":
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { aLaVenta: boolean; nombre: string }) => {
            return !obj.aLaVenta && obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          });
        } else {
          this.busquedaRubro = this.rubrosIngredientes.filter((obj: { aLaVenta: boolean; }) => {
            return !obj.aLaVenta;
          });
        }
        break;
    }
  }

  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/rubro-ingredientes/modificar-estado-rubro/' + id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
