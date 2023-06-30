import { Cliente } from './Cliente';
import { DetallePedido } from './DetallePedido';
import { Domicilio } from './Domicilio';
import { Envio } from './Envio';
import { Estado } from './Estado';
import { Factura } from './Factura';
import { MercadoPagoDatos } from './MercadoPagoDatos';

export class Pedido {
  id: number = 0;
  fecha: Date = new Date();
  numero: number = 0;
  horaEstadimadaFin: number = 0;
  total: number = 0;
  envio: Envio = new Envio();
  mercadoPagoDatos: MercadoPagoDatos = new MercadoPagoDatos();
  factura: Factura = new Factura();
  cliente!: Cliente;
  detallesPedido: DetallePedido[] = [];
  domicilio: Domicilio = new Domicilio();
  estado: Estado = new Estado();
}
