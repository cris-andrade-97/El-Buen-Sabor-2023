import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/entidades/CartItem';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css'],
})
export class CartComponent implements OnInit {
  articulos: any[] = [];
  precioFinal: number = 0;

  constructor(private cartService: CartService) {
    this.articulos = this.cartService.items;
    this.calculaTotal();
  }

  async ngOnInit(): Promise<void> {}

  async getItems() {
    this.articulos = this.cartService.items;
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
    this.articulos = this.cartService.items;
    this.calculaTotal();
  }

  updateItem(item: CartItem, quantity: number): void {
    this.cartService.updateItem(item, quantity);
    this.articulos = this.cartService.items;
    this.calculaTotal();
  }

  resta(item: any) {
    this.cartService.decrementQuantity(item);
    this.articulos = this.cartService.items;
    this.calculaTotal();
  }

  suma(item: any) {
    this.cartService.incrementQuantity(item);
    this.articulos = this.cartService.items;
    this.calculaTotal();
  }

  async clearCart(): Promise<void> {
    await this.cartService.clearCart();
    await this.getItems();
    this.calculaTotal();
  }

  calculaTotal() {
    this.precioFinal = 0;
    for (let i = 0; i < this.articulos.length; i++) {
      if (!this.articulos[i].quantity) {
        this.articulos[i].quantity = 1;
        this.precioFinal +=
          this.articulos[i].precioVenta * this.articulos[i].quantity;
      } else {
        this.precioFinal +=
          this.articulos[i].precioVenta * this.articulos[i].quantity;
      }
    }
  }
}
