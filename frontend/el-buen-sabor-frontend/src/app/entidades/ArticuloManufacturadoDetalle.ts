import { ArticuloInsumo } from './ArticuloInsumo';
import { ArticuloManufacturado } from './ArticuloManufacturado';
import { UnidadMedida } from './UnidadMedida';

export class ArticuloManufacturadoDetalle {
  id: number = 0;
  cantidad: number = 0;
  articuloInsumo: ArticuloInsumo = new ArticuloInsumo();
  articuloManufacturado: ArticuloManufacturado = new ArticuloManufacturado();
}
