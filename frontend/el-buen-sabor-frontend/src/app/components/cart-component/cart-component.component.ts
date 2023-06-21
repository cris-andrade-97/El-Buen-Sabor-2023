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

  constructor(private cartService: CartService) { this.calculaTotal() }

  async ngOnInit(): Promise<void> {
    this.calculaTotal();
  }

  async getItems() {
    this.articulos = this.cartService.items;
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
    this.calculaTotal();
  }

  updateItem(item: CartItem, quantity: number): void {
    this.cartService.updateItem(item, quantity);
    this.calculaTotal();
  }

  resta(item: any) {
    if (item.quantity == 1) {
      this.removeItem(item);
    } else {
      this.cartService.decrementQuantity(item);
      this.calculaTotal()
    }
  }

  suma(item: any) {
    this.cartService.incrementQuantity(item);
    this.calculaTotal();
  }

  async clearCart(): Promise<void> {
    await this.cartService.clearCart();
    await this.calculaTotal()
  }

  async calculaTotal() {
    this.articulos = await this.cartService.devolverCarritoCompleto()
    this.precioFinal = await this.cartService.calcularTotal()
  }
}
