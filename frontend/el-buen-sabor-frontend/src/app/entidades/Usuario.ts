import { Cliente } from './Cliente';
import { Rol } from './Rol';

export class Usuario {
  id: number = 0;
  usuario: string = '';
  clave: string = '';
  uid: string = '';
  rol: Rol = new Rol();
  cliente!: Cliente ;

  // constructor(cliente: Cliente | null) { // pass the needed instance through the constructor
  //   this.cliente = cliente;
  // }
}