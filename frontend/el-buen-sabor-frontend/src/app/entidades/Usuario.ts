import { Cliente } from './Cliente';
import { Rol } from './Rol';

export class Usuario {
  id: number = 0;
  usuario: string = '';
  clave: string = '';
  rol: Rol = new Rol();
  cliente: Cliente = new Cliente();
}
