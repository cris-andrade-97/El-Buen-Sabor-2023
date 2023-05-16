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
  esNuevo: boolean = false;
  id = this.route.snapshot.paramMap.get('id');
  unidadMedida: UnidadMedida = new UnidadMedida();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private servicioDelivery: DeliveryService
  ) {}

  async ngOnInit(): Promise<void> {
    //Obtengo Rubro

    await this.getUnidadMedida();
  }

  async getUnidadMedida() {
    //Si es nuevo deja el formulario en blanco
    if (this.id == 'nuevaUnidad') {
      this.esNuevo = true;
    } else {
      const id: number = parseInt(this.id || '0', 10);
      this.unidadMedida = await this.servicioDelivery.getXId(
        'unidadMedida',
        id
      );
    }
  }

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
      await this.servicioDelivery.save(this.unidadMedida, 'unidadMedida');
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
