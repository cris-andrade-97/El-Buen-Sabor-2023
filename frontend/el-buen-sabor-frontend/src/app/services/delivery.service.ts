import { Injectable } from '@angular/core';
import { UnidadMedida } from '../entidades/UnidadMedida';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor() {}

  public async getUnidadesMedida(): Promise<any[]> {
    const res = await fetch('http://localhost:9000/api/v1/unidadMedida');
    const resJson = await res.json();
    return resJson;
  }

  public async getUnidadMedidaXID(id: number): Promise<any> {
    let urlServer = 'http://localhost:9000/api/v1/unidadMedida/' + id;
    let response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
    return await response.json();
  }

  public async saveUnidadMedida(unidadMedida?: UnidadMedida) {
    let urlServer = 'http://localhost:9000/api/v1/unidadMedida';
    let method: string = 'POST';

    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(unidadMedida),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
