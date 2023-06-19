import { Injectable } from '@angular/core';
import { UnidadMedida } from '../entidades/UnidadMedida';
import { RubroInsumo } from '../entidades/RubroInsumo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

function desenrollarObjeto(
  obj: any,
  objetosProcesados: Set<any> = new Set()
): any {
  if (obj && typeof obj === 'object') {
    if (objetosProcesados.has(obj)) {
      // Si el objeto ya fue procesado, devuelve null
      return null;
    }

    // Agrega el objeto actual al conjunto de objetos procesados
    objetosProcesados.add(obj);

    // Recorre las propiedades del objeto
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // Desenrolla cada propiedad del objeto
        obj[prop] = desenrollarObjeto(obj[prop], objetosProcesados);
      }
    }
  }

  return obj;
}

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(private http: HttpClient) {}
  public async get(nombreEntidad: string): Promise<any[]> {
    const res = await fetch('http://localhost:9000/api/v1/' + nombreEntidad);
    const resJson = await res.json();
    return resJson;
  }

  public async getMax(nombreEntidad: string): Promise<any> {
    const res = await fetch(
      'http://localhost:9000/api/v1/' + nombreEntidad + '/max'
    );
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

    console.log('le paso lo siguiente: ' + JSON.stringify(entidad));
  }

  // public async save(entidad: any, nombreEntidad: string) {
  //   let urlServer = 'http://localhost:9000/api/v1/' + nombreEntidad;

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   try {
  //     const response = await this.http
  //       .post(urlServer, entidad, { headers })
  //       .toPromise();

  //     if (response) {
  //       const data = response as any;
  //       const id = data.id; // Assuming the ID property is named "id"
  //       return id;
  //     } else {
  //       throw new Error('Failed to save entity');
  //     }
  //   } catch (error) {
  //     console.error('Error saving entity:', error);
  //     throw error;
  //   }
  // }

  public async save2(entidad: any, nombreEntidad: string) {
    let urlServer = 'http://localhost:9000/api/v1/' + nombreEntidad;
    let method: string = 'POST';

    const desenrollado = desenrollarObjeto(entidad);

    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(desenrollado),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(JSON.stringify(desenrollado));
  }
}
