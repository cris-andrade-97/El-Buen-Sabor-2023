import { ArticuloInsumo } from './ArticuloInsumo';
import { ArticuloManufacturado } from './ArticuloManufacturado';
import { Pedido } from './Pedido';

export class DetallePedido {
  id: number = 0;
  cantidad: number = 0;
  subtotal: number = 0;
  pedido: Pedido = new Pedido();
  articuloManufacturado: ArticuloManufacturado = new ArticuloManufacturado();
  articuloInsumo: ArticuloInsumo = new ArticuloInsumo();
}
