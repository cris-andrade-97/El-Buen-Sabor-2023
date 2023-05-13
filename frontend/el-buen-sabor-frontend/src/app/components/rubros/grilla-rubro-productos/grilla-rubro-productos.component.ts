import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-grilla-rubro-productos',
  templateUrl: './grilla-rubro-productos.component.html',
  styleUrls: ['./grilla-rubro-productos.component.css'],
})
export class GrillaRubroProductosComponent implements OnInit {
  rubrosProductos: any[] = [];
  busquedaRubro: any[] = [];
  busqueda: string = "";
  filtro: string = "ninguno";

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista();
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/rubro-articulos-manufacturados/listar';

    this.http.get(url).subscribe((response: any) => {
      this.rubrosProductos = response.sort((a: { nombre: string; }, b: { nombre: any; }) => a.nombre.localeCompare(b.nombre));;
      this.busquedaRubro = this.rubrosProductos;
    });
  }

  async filtrar() {
    switch (this.filtro) {
      case "ninguno":        
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosProductos.filter((obj: { nombre: string; }) => {
            return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          })
        } else {
          this.busquedaRubro = this.rubrosProductos;
        }
        break;
      case "vigencia":
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosProductos.filter((obj: { estado: boolean; nombre: string }) => {
            return obj.estado && obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          })
        } else {
          this.busquedaRubro = this.rubrosProductos.filter((obj: { estado: boolean; }) => {
            return obj.estado;
          });
        }
        break;
      case "no-vigencia":
        if (this.busqueda != "" || this.busqueda) {
          this.busquedaRubro = this.rubrosProductos.filter((obj: { estado: boolean; nombre: string }) => {
            return !obj.estado && obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
          });
        } else {
          this.busquedaRubro = this.rubrosProductos.filter((obj: { estado: boolean; }) => {
            return !obj.estado;
          });
        }
        break;
    }
  }

  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/rubro-articulos-manufacturados/modificar-estado-rubro/' +
      id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
