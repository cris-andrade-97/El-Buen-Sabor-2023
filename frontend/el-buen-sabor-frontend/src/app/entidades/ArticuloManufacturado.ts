import { ArticuloManufacturadoDetalle } from './ArticuloManufacturadoDetalle';
import { DetalleFactura } from './DetalleFactura';
import { DetallePedido } from './DetallePedido';
import { RubroArticuloManufacturado } from './RubroArticuloManufacturado';

export class ArticuloManufacturado {
  id: number = 0;
  tiempoEstimadoCocina: number = 0;
  denominacion: string = '';
  precioVenta: number = 0;
  imagen: string = '';
  estado: boolean = true;
  precioCosto: number = 0;
  detallesPedido: DetallePedido[] = [];
  detallesFactura: DetalleFactura[] = [];
  rubroArticuloManufacturado: RubroArticuloManufacturado =
    new RubroArticuloManufacturado();
  articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];
}
