import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-grilla-rubro-ingredientes',
  templateUrl: './grilla-rubro-ingredientes.component.html',
  styleUrls: ['./grilla-rubro-ingredientes.component.css'],
})
export class GrillaRubroIngredientesComponent implements OnInit {
  rubrosIngredientes: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  async ngOnInit(): Promise<void> {
    await this.llenarLista();
  }

  async llenarLista() {
    
    let url = 'http://localhost:3000/api/rubro-ingredientes/listar';

    this.http.get(url).subscribe((response) => {
      this.rubrosIngredientes = response;
    });
    
  }

  actualizarVigencia(id: number, estado: boolean) {
    this.spinner.show();
    let url =
      'http://localhost:3000/api/rubro-ingredientes/modificar-estado-rubro/' +
      id;

    this.http
      .put(url, {
        estado: estado,
      })
      .subscribe((response) => console.log(response));

    window.location.reload();
  }
}
