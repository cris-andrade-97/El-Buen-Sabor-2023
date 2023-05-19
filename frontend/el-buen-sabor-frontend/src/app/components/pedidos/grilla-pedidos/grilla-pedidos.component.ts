import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grilla-pedidos',
  templateUrl: './grilla-pedidos.component.html',
  styleUrls: ['./grilla-pedidos.component.css']
})
export class GrillaPedidosComponent implements OnInit {


  grillaPedidosTemporal: any = {
    "pedidos": [
      {
        "id": 0,
        "usuario": "cristian201097",
        "estado": "A Preparar",
        "tipoEnvio": "Domicilio",
        "fecha": "2020-01-01",
        "hora": "12:00",
        "horaEstimada": "13:00",
        "total": 6100,
        "detallesPedido": [
          {
            "id": 0,
            "producto": {
              "id": 1,
              "nombre": "Pizza con Salchichas",
              "precioVenta": 2300,
              "imagen": "https://pizzasargentinas.com/wp-content/uploads/2020/11/Pizza-de-salchichas-1024x1022-1-731x411.jpg",
              "estado": true,
              "rubroArticulo": "Pizzas",
              "articuloManufacturadoDetalle": [
                {
                  "id": 1,
                  "nombre": "Queso Cremoso",
                  "cantidad": 200,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 459.99999999999994
                },
                {
                  "id": 2,
                  "nombre": "Harina de Trigo 0000",
                  "cantidad": 500,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 100
                },
                {
                  "id": 3,
                  "nombre": "Salchicha",
                  "cantidad": 6,
                  "unidadDeMedida": "unidad",
                  "costoIngrediente": 312
                }
              ],
              "costoTotal": 872
            },
            "quantity": 1,
            "subtotal": 2300
          },
          {
            "id": 1,
            "producto": {
              "id": 2,
              "nombre": "Hamburguesa Americana",
              "precioVenta": 1900,
              "imagen": "https://i.ibb.co/Hhg4DFR/Americana.jpg",
              "estado": true,
              "rubroArticulo": "Hamburguesas",
              "articuloManufacturadoDetalle": [
                {
                  "id": 1,
                  "nombre": "Carne Molida",
                  "cantidad": 200,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 240
                },
                {
                  "id": 2,
                  "nombre": "Huevos",
                  "cantidad": 2,
                  "unidadDeMedida": "unidad",
                  "costoIngrediente": 160
                },
                {
                  "id": 3,
                  "nombre": "Cebolla",
                  "cantidad": 50,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 8.5
                },
                {
                  "id": 4,
                  "nombre": "Queso Cremoso",
                  "cantidad": 100,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 229.99999999999997
                }
              ],
              "costoTotal": 638.5
            },
            "quantity": 2,
            "subtotal": 3800
          }
        ]
      },
      {
        "id": 1,
        "usuario": "francoMoreno",
        "tipoEnvio": "Por Local",
        "estado": "A Confirmar",
        "fecha": "2020-01-01",
        "hora": "13:00",
        "horaEstimada": "14:00",
        "total": 6350,
        "detallesPedido": [
          {
            "id": 0,
            "producto": {
              "id": 7,
              "nombre": "Provolomo",
              "precioVenta": 2300,
              "imagen": "https://i.ibb.co/1Xttjgm/provolomo-solo-prueba-2.png",
              "estado": true,
              "rubroArticulo": "Lomos",
              "articuloManufacturadoDetalle": [
                {
                  "id": 1,
                  "nombre": "Cebolla",
                  "cantidad": 50,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 8.5
                },
                {
                  "id": 2,
                  "nombre": "Huevos",
                  "cantidad": 3,
                  "unidadDeMedida": "unidad",
                  "costoIngrediente": 240
                },
                {
                  "id": 3,
                  "nombre": "Harina de Trigo 0000",
                  "cantidad": 200,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 40
                },
                {
                  "id": 4,
                  "nombre": "Papa",
                  "cantidad": 100,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 50
                },
                {
                  "id": 5,
                  "nombre": "Queso Provolone",
                  "cantidad": 150,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 645
                },
                {
                  "id": 6,
                  "nombre": "Queso Cremoso",
                  "cantidad": 100,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 229.99999999999997
                },
                {
                  "id": 7,
                  "nombre": "Tomate",
                  "cantidad": 100,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 70
                }
              ],
              "costoTotal": 1283.5
            },
            "quantity": 2,
            "subtotal": 4600
          },
          {
            "id": 1,
            "producto": {
              "id": 12,
              "nombre": "Pizza con Jamón",
              "precioVenta": 1750,
              "imagen": "https://i.ibb.co/7Rb1ypx/Jamon-Top.jpg",
              "estado": true,
              "rubroArticulo": "Pizzas",
              "articuloManufacturadoDetalle": [
                {
                  "id": 1,
                  "nombre": "Harina de Trigo 0000",
                  "cantidad": 100,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 20
                },
                {
                  "id": 2,
                  "nombre": "Papa",
                  "cantidad": 150,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 75
                },
                {
                  "id": 3,
                  "nombre": "Salsa de Tomate",
                  "cantidad": 100,
                  "unidadDeMedida": "ml",
                  "costoIngrediente": 50
                },
                {
                  "id": 4,
                  "nombre": "Jamón Cocido",
                  "cantidad": 100,
                  "unidadDeMedida": "gr",
                  "costoIngrediente": 300
                }
              ],
              "costoTotal": 445
            },
            "quantity": 1,
            "subtotal": 1750
          }
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit() {

  }
}
