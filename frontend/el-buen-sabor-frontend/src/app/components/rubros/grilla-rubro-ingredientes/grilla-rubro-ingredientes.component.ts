import { Component, OnInit } from '@angular/core';
import RubroIngredientesJSON from './RubroIngredientes.json'
@Component({
  selector: 'app-grilla-rubro-ingredientes',
  templateUrl: './grilla-rubro-ingredientes.component.html',
  styleUrls: ['./grilla-rubro-ingredientes.component.css']
})
export class GrillaRubroIngredientesComponent implements OnInit {

  ingredientesNoVendibles = RubroIngredientesJSON['rubro-ingredientes'].filter(obj => obj.aLaVenta == false);
  ingredientesVendibles = RubroIngredientesJSON['rubro-ingredientes'].filter(obj => obj.aLaVenta == true);
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
