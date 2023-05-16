import { ArticuloInsumo } from './ArticuloInsumo';

export class RubroInsumo {
  id: number = 0;
  denominacion: string = '';
  estado: boolean = true;
  aLaVenta: boolean = false;
  rubroPadre: RubroInsumo | undefined;
  rubrosHijos: RubroInsumo[] = [];
  articulosInsumo: ArticuloInsumo[] = [];
}
