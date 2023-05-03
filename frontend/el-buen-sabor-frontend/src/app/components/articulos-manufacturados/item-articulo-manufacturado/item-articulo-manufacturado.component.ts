import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-articulo-manufacturado',
  templateUrl: './item-articulo-manufacturado.component.html',
  styleUrls: ['./item-articulo-manufacturado.component.css'],
})
export class ItemArticuloManufacturadoComponent implements OnInit {
  articulosManufacturados!: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.llenarLista();
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/articulos-manufacturados/listar';

    this.http.get(url).subscribe((response) => {
      this.articulosManufacturados = response;
    });
  }
}
