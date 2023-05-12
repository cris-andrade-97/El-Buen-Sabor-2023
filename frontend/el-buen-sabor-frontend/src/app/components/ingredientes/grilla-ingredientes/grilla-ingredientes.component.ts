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

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista()
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/ingredientes/listar';

    this.http.get(url).subscribe((response: any) => {
      this.ingredientes = response.sort((a: { nombre: string; },b: { nombre: any; })=>a.nombre.localeCompare(b.nombre));;
      this.ingredientesBusqueda = this.ingredientes
    });
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
