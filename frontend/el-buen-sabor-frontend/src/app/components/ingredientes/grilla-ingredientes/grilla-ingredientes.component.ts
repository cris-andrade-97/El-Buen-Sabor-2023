import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grilla-ingredientes',
  templateUrl: './grilla-ingredientes.component.html',
  styleUrls: ['./grilla-ingredientes.component.css']
})

export class GrillaIngredientesComponent implements OnInit {

  ingredientes!: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista()
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/ingredientes/listar';

    this.http.get(url).subscribe((response) => {
      this.ingredientes = response;
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
