import { ArticuloInsumo } from './ArticuloInsumo';

export class RubroInsumo {
  id: number = 0;
  denominacion: string = '';
  estado: boolean = false;
  aLaVenta: boolean = false;
  rubroPadre: RubroInsumo = new RubroInsumo();
  rubrosHijos: RubroInsumo[] = [];
  articulosInsumo: ArticuloInsumo[] = [];
}
