import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-articulo-manufacturado',
  templateUrl: './detalle-articulo-manufacturado.component.html',
  styleUrls: ['./detalle-articulo-manufacturado.component.css'],
})
export class DetalleArticuloManufacturadoComponent implements OnInit {
  articuloManufacturado!: any;
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {}
  async ngOnInit(): Promise<void> {
    await this.obtenerArticulo();
  }
  async obtenerArticulo() {
    this.articuloManufacturado = this.http
      .get(
        'http://localhost:3000/api/articulos-manufacturados/buscar-por-id/' +
          this.id
      )
      .subscribe(async (response) => {
        this.articuloManufacturado = response;
      });
  }
}
