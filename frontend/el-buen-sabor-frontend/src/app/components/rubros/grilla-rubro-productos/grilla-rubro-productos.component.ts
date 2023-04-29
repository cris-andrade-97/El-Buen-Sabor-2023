import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-grilla-rubro-productos',
  templateUrl: './grilla-rubro-productos.component.html',
  styleUrls: ['./grilla-rubro-productos.component.css'],
})
export class GrillaRubroProductosComponent implements OnInit {
  rubrosProductos!: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.llenarLista();
  }

  llenarLista() {
    let url = 'http://localhost:3000/api/rubro-articulos-manufacturados/listar';

    this.http.get(url).subscribe((response) => {
      this.rubrosProductos = response;
    });
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
