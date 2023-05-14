import { ArticuloInsumo } from "./ArticuloInsumo";

export class UnidadMedida {
  id: number = 0;
  denominacion: string = '';
  unidad: string = '';
  articulosInsumo: ArticuloInsumo[] = [];
}
