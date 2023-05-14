import { Pedido } from './Pedido';

export class Envio {
  id: number = 0;
  tipoEnvio: string = '';
  pedidos: Pedido[] = [];
}
