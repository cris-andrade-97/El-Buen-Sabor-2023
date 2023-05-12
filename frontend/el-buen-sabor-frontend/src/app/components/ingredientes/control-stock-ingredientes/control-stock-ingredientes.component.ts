import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-control-stock-ingredientes',
  templateUrl: './control-stock-ingredientes.component.html',
  styleUrls: ['./control-stock-ingredientes.component.css']
})
export class ControlStockIngredientesComponent {

  ingredientes!: any;
  ingredientesConStockBajo!: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.llenarLista()
  }

  async llenarLista() {
    let url = 'http://localhost:3000/api/ingredientes/listar';

    this.http.get(url).subscribe((response: any) => {
      this.ingredientes = response.filter((obj: { cantidadActual: number; stockMinimoInsumo: number; }) => {
        const cercaStockMinimo = obj.stockMinimoInsumo * 1.2
        return obj.cantidadActual < obj.stockMinimoInsumo || obj.cantidadActual <= cercaStockMinimo
      });
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
