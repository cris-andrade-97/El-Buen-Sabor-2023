import { ArticuloManufacturado } from './ArticuloManufacturado';

export class RubroArticuloManufacturado {
  id: number = 0;
  denominacion: string = '';
  estado: boolean = true;
  articulosManufacturados: ArticuloManufacturado[] = [];
}
