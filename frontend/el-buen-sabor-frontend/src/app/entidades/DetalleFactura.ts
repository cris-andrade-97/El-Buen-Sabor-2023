import { ArticuloInsumo } from './ArticuloInsumo';
import { ArticuloManufacturado } from './ArticuloManufacturado';
import { Factura } from './Factura';

export class DetalleFactura {
  id: number = 0;
  cantidad: number = 0;
  subtotal: number = 0;
  factura: Factura = new Factura();
  articuloManufacturado: ArticuloManufacturado = new ArticuloManufacturado();
  articuloInsumo: ArticuloInsumo = new ArticuloInsumo();
}
