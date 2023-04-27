import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import RubroIngredientesJSON from '../grilla-rubro-ingredientes/RubroIngredientes.json'

//import { lecturaDatos } from 'persistencia/persistencia';

@Component({
  selector: 'app-formulario-rubro-ingredientes',
  templateUrl: './formulario-rubro-ingredientes.component.html',
  styleUrls: ['./formulario-rubro-ingredientes.component.css']
})
export class FormularioRubroIngredientesComponent implements OnInit {

  rubro!:UntypedFormGroup;  
  esNuevo: boolean = false;
  rubroIngrediente!: any;
  nombre = new UntypedFormControl("")
  estado: boolean = false;

  id = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute,private fb: UntypedFormBuilder) { }

  ngOnInit(): void {  
    
    this.rubroIngrediente = RubroIngredientesJSON["Ingredientes_No_Vendibles"][Number(this.id)];  

    this.estado = this.rubroIngrediente.estado; 
    this.nombre.setValue (this.rubroIngrediente.nombre)
    if(this.id == 'nuevoRubro'){
      this.esNuevo = true;
    }
    

  }

  asignarEstado(estadoRubro: boolean){
    this.estado = estadoRubro;     
  }

  onSubmit(){
    //lecturaDatos(Number(this.id),this.nombre.value,this.estado)
    

    


    window.location.replace("/grilla-rubro-ingredientes")
  }
  
}
