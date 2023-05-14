import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnidadMedida } from 'src/app/entidades/UnidadMedida';
import { DeliveryService } from 'src/app/services/delivery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-unidad-de-medida',
  templateUrl: './formulario-unidad-de-medida.component.html',
  styleUrls: ['./formulario-unidad-de-medida.component.css'],
})
export class FormularioUnidadDeMedidaComponent implements OnInit {
  UMedida: any;
  esNuevo: boolean = false;
  nombre: string = '';
  unidad: string = '';
  //estado: boolean = false;
  id = this.route.snapshot.paramMap.get('id');

  unidadMedida: UnidadMedida = new UnidadMedida();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubro
    //await this.obtenerUMedida();
    await this.getUnidadMedida();
  }

  async getUnidadMedida() {
    //Si es nuevo deja el formulario en blanco
    if (this.id == 'nuevaUnidad') {
      this.esNuevo = true;
    } else {
      const id: number = parseInt(this.id || '0', 10);
      this.unidadMedida = await this.servicioDelivery.getUnidadMedidaXID(id);
    }
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
        //this.estado = this.UMedida.estado;
        this.nombre = this.UMedida.nombre;
        this.unidad = this.UMedida.unidad;
      }
    });
  }

  // async post() {
  //   //Verifico si el nombre está vacio
  //   if (this.nombre.length == 0 || this.unidad.length == 0) {
  //     return Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Hay campos vacíos.',
  //     });
  //   } else {
  //     //Si esta todo ok, verifico si es put o post mediante ID
  //     //POST
  //     if (this.esNuevo) {
  //       let url = 'http://localhost:3000/api/unidad-de-medida/nuevo';

  //       const data = {
  //         nombre: this.nombre,
  //         unidad: this.unidad,
  //       };

  //       this.http.post(url, data).subscribe(async (response) => {
  //         if (response) {
  //           await Swal.fire('Unidad de medida agregada!');
  //           window.location.replace('/grilla-unidad-de-medida');
  //         }
  //       });
  //       return;
  //     } else {
  //       //PUT
  //       let url =
  //         'http://localhost:3000/api/unidad-de-medida/modificar-todo/' +
  //         this.id;

  //       const data = {
  //         nombre: this.nombre,
  //         unidad: this.unidad,
  //       };

  //       this.http.put(url, data).subscribe(async (response) => {
  //         if (response) {
  //           await Swal.fire('Unidad de medida actualizada!');
  //           window.location.replace('/grilla-unidad-de-medida');
  //         }
  //       });
  //       return;
  //     }
  //   }
  // }

  async post() {
    //Verifico si el nombre está vacio
    if (
      this.unidadMedida.denominacion.length == 0 ||
      this.unidadMedida.unidad.length == 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay campos vacíos.',
      });
    } else {
      await this.servicioDelivery.saveUnidadMedida(this.unidadMedida);
      if (this.esNuevo) {
        await Swal.fire('Unidad de medida agregada');
        window.location.replace('/grilla-unidad-de-medida');
      } else {
        await Swal.fire('Unidad de medida Actualizada');
        window.location.replace('/grilla-unidad-de-medida');
      }
    }
  }
}
