import { Injectable } from '@angular/core';
import { UnidadMedida } from '../entidades/UnidadMedida';
import { RubroInsumo } from '../entidades/RubroInsumo';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor() {}

  public async get(nombreEntidad: string): Promise<any[]> {
    const res = await fetch('http://localhost:9000/api/v1/' + nombreEntidad);
    const resJson = await res.json();
    return resJson;
  }

  public async getXId(nombreEntidad: string, id: number): Promise<any> {
    let urlServer = 'http://localhost:9000/api/v1/' + nombreEntidad + '/' + id;
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

  public async save(entidad: any, nombreEntidad: string) {
    let urlServer = 'http://localhost:9000/api/v1/' + nombreEntidad;
    let method: string = 'POST';

    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(entidad),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
