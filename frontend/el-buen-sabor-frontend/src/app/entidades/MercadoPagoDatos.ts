import { Pedido } from './Pedido';

export class MercadoPagoDatos {
  id: number = 0;
  identificadorPago: number = 0;
  fechaCreacion: Date = new Date();
  fechaAprobacion: Date = new Date();
  formaPago: string = '';
  metodoPago: string = '';
  nroTarjeta: string = '';
  estado: string = '';
  pedido: Pedido = new Pedido();
}
