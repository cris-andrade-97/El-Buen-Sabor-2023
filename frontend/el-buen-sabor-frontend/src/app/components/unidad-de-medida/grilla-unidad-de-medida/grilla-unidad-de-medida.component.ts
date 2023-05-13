import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grilla-unidad-de-medida',
  templateUrl: './grilla-unidad-de-medida.component.html',
  styleUrls: ['./grilla-unidad-de-medida.component.css']
})
export class GrillaUnidadDeMedidaComponent implements OnInit {
  unidadesDeMedida: any[] = [];
  busquedaUnidad: any[] = [];
  busqueda: string = ""

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.llenarLista();
  }

  async buscar() {
    if (this.busqueda || this.busqueda != "") {
      this.busquedaUnidad = this.unidadesDeMedida.filter((obj) => {
        return obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      })
    } else {
      this.busquedaUnidad = this.unidadesDeMedida;
    }
  }

  llenarLista() {
    let url = 'http://localhost:3000/api/unidad-de-medida/listar';

    this.http.get(url).subscribe((response: any) => {
      this.unidadesDeMedida = response.sort((a: { nombre: string }, b: { nombre: string }) =>
        a.nombre.localeCompare(b.nombre)
      );
      this.busquedaUnidad = this.unidadesDeMedida
    });
  }
}
