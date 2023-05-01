import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-unidad-de-medida',
  templateUrl: './formulario-unidad-de-medida.component.html',
  styleUrls: ['./formulario-unidad-de-medida.component.css'],
})
export class FormularioUnidadDeMedidaComponent implements OnInit {
  UMedida: any;
  esNuevo: boolean = false;
  nombreUMedida: string = '';
  estado: boolean = false;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubro
    await this.obtenerUMedida();
  }

  async obtenerUMedida() {
    let url =
      'http://localhost:3000/api/unidad-de-medida/buscar-por-id/' + this.id;

    this.http.get(url).subscribe((response) => {
      //Si es nuevo deja el formulario en blanco
      if (this.id == 'nuevaUnidad') {
        this.esNuevo = true;
      } else {
        //Si es modificación seteo los valores
        this.UMedida = response;
        this.estado = this.UMedida.estado;
        this.nombreUMedida = this.UMedida.nombreUMedida;
      }
    });
  }

  async post() {
    //Verifico si el nombre está vacio
    if (this.nombreUMedida.length == 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacio',
      });
    } else {
      //Si esta todo ok, verifico si es put o post mediante ID
      //POST
      if (this.esNuevo) {
        let url = 'http://localhost:3000/api/unidad-de-medida/nueva-unidad';

        const data = {
          nombreUMedida: this.nombreUMedida,
          estado: this.estado,
        };

        this.http.post(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Unidad de medida agregada!');
            window.location.replace('/grilla-unidad-de-medida');
          }
        });
        return;
      } else {
        //PUT
        let url =
          'http://localhost:3000/api/unidad-de-medida/modificar-unidad/' +
          this.id;

        const data = {
          nombreUMedida: this.nombreUMedida,
          estado: this.estado,
        };

        this.http.put(url, data).subscribe(async (response) => {
          if (response) {
            await Swal.fire('Unidad de medida actualizada!');
            window.location.replace('/grilla-unidad-de-medida');
          }
        });
        return;
      }
    }
  }
}
