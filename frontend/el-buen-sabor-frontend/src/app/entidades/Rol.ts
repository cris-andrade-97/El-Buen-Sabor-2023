import { Usuario } from './Usuario';

export class Rol {
  id: number = 0;
  denominacion: string = '';
  usuarios: Usuario[] = [];
}
