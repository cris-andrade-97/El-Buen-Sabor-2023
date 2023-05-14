import { DetalleFactura } from './DetalleFactura';
import { Pedido } from './Pedido';

export class Factura {
  id: number = 0;
  fecha: Date = new Date();
  numero: number = 0;
  montoDescuento: number = 0;
  formaPago: string = '';
  nroTarjeta: string = '';
  totalVenta: number = 0;
  totalCosto: number = 0;
  pedidos: Pedido = new Pedido();
  detallesFactura: DetalleFactura[] = [];
}
