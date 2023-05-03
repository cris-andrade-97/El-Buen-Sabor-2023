import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grilla-articulos-manufacturados',
  templateUrl: './grilla-articulos-manufacturados.component.html',
  styleUrls: ['./grilla-articulos-manufacturados.component.css']
})
export class GrillaArticulosManufacturadosComponent implements OnInit {
  articulosManufacturados!: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista()
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/articulos-manufacturados/listar';

    this.http.get(url).subscribe((response) => {
      this.articulosManufacturados = response;
    });
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