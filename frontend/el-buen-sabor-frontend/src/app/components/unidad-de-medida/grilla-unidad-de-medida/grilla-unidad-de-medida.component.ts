import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grilla-unidad-de-medida',
  templateUrl: './grilla-unidad-de-medida.component.html',
  styleUrls: ['./grilla-unidad-de-medida.component.css']
})
export class GrillaUnidadDeMedidaComponent implements OnInit {
  unidadDeMedidas!: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.llenarLista();
  }

  llenarLista() {
    let url = 'http://localhost:3000/api/unidad-de-medida/listar';

    this.http.get(url).subscribe((response) => {
      this.unidadDeMedidas = response;
    });
  }

  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/unidad-de-medida/modificar-estado-unidad/' +
      id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
