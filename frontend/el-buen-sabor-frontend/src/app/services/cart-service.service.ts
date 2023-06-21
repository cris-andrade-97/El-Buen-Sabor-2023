import { Injectable, OnInit } from '@angular/core';
import { CartItem } from '../entidades/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  items: any[] = [];
  amount: number = 0;

  constructor() {
    this.getItem();
  }

  async ngOnInit(): Promise<void> {
    await this.getItem();
  }

  async getItem() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.items = JSON.parse(storedCart);
    }
  }

  async amountItems() {
    this.amount = 0;
    if (await this.devolverCarritoCompleto()) {
      (await this.devolverCarritoCompleto()).forEach(item =>
        this.amount += item.quantity)
    }
  }

  async devolverAmount() {
    await this.amountItems();
    return this.amount
  }

  async devolverCarritoCompleto() {
    return this.items
  }

  async addItem(item: any): Promise<void> {
    await this.getItem();
    console.log('recibe: ' + item.id);
    const existingItemIndex = this.items.findIndex((i) => i.id === item.id);
    console.log('es : ' + existingItemIndex);

    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity += 1;
    } else {
      item.quantity = 1;
      this.items.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
    await this.amountItems();
    console.log(this.items)
  }

  async removeItem(item: any): Promise<void> {
    await this.getItem();
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
    await this.amountItems();
  }

  async updateItem(item: any, quantity: number): Promise<void> {
    await this.getItem();
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
    await this.amountItems();
  }

  // Incrementa la cantidad de un artículo en el carrito en una unidad
  async incrementQuantity(item: any): Promise<void> {
    await this.getItem();
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
    await this.amountItems();
  }

  // Decrementa la cantidad de un artículo en el carrito en una unidad
  async decrementQuantity(item: any): Promise<void> {
    await this.getItem();
    if (item.quantity >= 1) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
          localStorage.setItem('cart', JSON.stringify(this.items));
        } else {
          await this.removeItem(item);
        }
      }
    }
    await this.amountItems();
  }

  async calcularTotal() {
    let total = 0;
    for (let item of await this.devolverCarritoCompleto()) {
      total += item.quantity * item.precioVenta
    }
    return total;
  }

  async clearCart(): Promise<void> {
    await this.getItem();
    this.items = [];
    localStorage.removeItem('cart');
    this.amount = 0;
  }
}
