import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grilla-ingredientes',
  templateUrl: './grilla-ingredientes.component.html',
  styleUrls: ['./grilla-ingredientes.component.css']
})

export class GrillaIngredientesComponent implements OnInit {

  ingredientes: any[] = [];
  ingredientesBusqueda: any[] = [];
  busqueda: string = "";
  filtro: string = "ninguno";
  listaRubros: any[] = [];
  auxiliar: any[] = [];
  filtroRubro: string = "ninguno";

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista()
    await this.obtenerRubros()
    this.auxiliar = [];
  }

  async obtenerRubros() {
    this.http.get('http://localhost:3000/api/rubro-ingredientes/listar').subscribe(
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
              this.ingredientesBusqueda = this.ingredientes;
            } else {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { rubroIngrediente: string; }) => {
                return obj.rubroIngrediente == this.filtroRubro;
              })
            }
            break;

          default:
            if (this.filtroRubro == "ninguno") {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { nombre: string; }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
              })
            } else {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { nombre: string; rubroIngrediente: string; }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.rubroIngrediente == this.filtroRubro;
              })
            }
            break;
        }
        break;
      case "vigencia":
        switch (this.busqueda) {
          case "" || null:
            if (this.filtroRubro == "ninguno") {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { rubroIngrediente: string; estado: boolean }) => {
                return obj.estado;
              })
            } else {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { rubroIngrediente: string; estado: boolean }) => {
                return obj.rubroIngrediente == this.filtroRubro && obj.estado;
              })
            }
            break;

          default:
            if (this.filtroRubro == "ninguno") {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { nombre: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.estado
              })
            } else {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { nombre: string; rubroIngrediente: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.rubroIngrediente == this.filtroRubro && obj.estado;
              })
            }
            break;
        }
        break;
      case "no-vigencia":
        switch (this.busqueda) {
          case "" || null:
            if (this.filtroRubro == "ninguno") {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { rubroIngrediente: string; estado: boolean }) => {
                return !obj.estado;
              })
            } else {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { rubroIngrediente: string; estado: boolean }) => {
                return obj.rubroIngrediente == this.filtroRubro && obj.estado;
              })
            }
            break;

          default:
            if (this.filtroRubro == "ninguno") {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { nombre: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && !obj.estado
              })
            } else {
              this.ingredientesBusqueda = this.ingredientes.filter((obj: { nombre: string; rubroIngrediente: string; estado: boolean }) => {
                return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) && obj.rubroIngrediente == this.filtroRubro && !obj.estado;
              })
            }
            break;
        }
        break;
    }
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/ingredientes/listar';

    this.http.get(url).subscribe((response: any) => {
      this.ingredientes = response.sort((a: { nombre: string; }, b: { nombre: any; }) => a.nombre.localeCompare(b.nombre));;
      this.ingredientesBusqueda = this.ingredientes
    });
  }



  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/ingredientes/modificar-estado/' + id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
