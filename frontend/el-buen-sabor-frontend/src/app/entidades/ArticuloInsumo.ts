import { ArticuloManufacturadoDetalle } from './ArticuloManufacturadoDetalle';
import { DetalleFactura } from './DetalleFactura';
import { DetallePedido } from './DetallePedido';
import { RubroInsumo } from './RubroInsumo';
import { UnidadMedida } from './UnidadMedida';

export class ArticuloInsumo {
  id: number = 0;
  denominacion: string = '';
  precioCompra: number = 0;
  precioVenta: number = 0;
  stockActual: number = 0;
  stockMinimo: number = 0;
  esInsumo: boolean = false;
  estado: boolean = false;
  unidadMedida: UnidadMedida = new UnidadMedida();
  detallesPedido: DetallePedido[] = [];
  detallesFactura: DetalleFactura[] = [];
  rubroInsumo: RubroInsumo = new RubroInsumo();
  articulosManufacturadoDetalle: ArticuloManufacturadoDetalle[] = [];
}
