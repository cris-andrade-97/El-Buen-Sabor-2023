import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-control-stock-ingredientes',
  templateUrl: './control-stock-ingredientes.component.html',
  styleUrls: ['./control-stock-ingredientes.component.css']
})
export class ControlStockIngredientesComponent {

  ingredientes: any[] = [];
  ingredientesBusqueda: any[] = [];
  ingredientesConStockBajo!: any;
  busqueda: string = "";

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista()
  }

  async buscar() {
    if (this.busqueda != "" || this.busqueda) {
      this.ingredientesBusqueda = await this.ingredientes.filter((obj: { nombre: string; }) => {
        return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      })
    } else {
      this.ingredientesBusqueda = this.ingredientes
    }
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/ingredientes/listar';

    this.http.get(url).subscribe((response: any) => {
      this.ingredientes = response.filter((obj: { cantidadActual: number; stockMinimoInsumo: number; }) => {
        return obj.cantidadActual < obj.stockMinimoInsumo || obj.cantidadActual <= obj.stockMinimoInsumo * 1.2
      });
      this.ingredientes = this.ingredientes.sort((a: { nombre: string; },b: { nombre: any; })=>a.nombre.localeCompare(b.nombre));
      this.ingredientesBusqueda = this.ingredientes
    });
  }
}
