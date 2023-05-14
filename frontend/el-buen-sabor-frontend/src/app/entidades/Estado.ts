import { Pedido } from './Pedido';

export class Estado {
  id: number = 0;
  denominacion: string = '';
  pedidos: Pedido[] = [];
}
