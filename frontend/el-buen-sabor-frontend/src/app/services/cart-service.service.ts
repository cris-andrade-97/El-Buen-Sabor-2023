import { Injectable, OnInit } from '@angular/core';
import { CartItem } from '../entidades/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  items: any[] = [];

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

  async addItem(item: any): Promise<void> {
    await this.getItem();
    console.log('recibe: ' + item);

    const existingItemIndex = this.items.findIndex((i) => i.id === item.id);
    console.log('es : ' + existingItemIndex);

    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  async removeItem(item: any): Promise<void> {
    await this.getItem();
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  async updateItem(item: any, quantity: number): Promise<void> {
    await this.getItem();
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  // Incrementa la cantidad de un artículo en el carrito en una unidad
  async incrementQuantity(item: any): Promise<void> {
    await this.getItem();
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  // Decrementa la cantidad de un artículo en el carrito en una unidad
  async decrementQuantity(item: any): Promise<void> {
    await this.getItem();
    if (item.quantity > 1) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
          localStorage.setItem('cart', JSON.stringify(this.items));
        } else {
          this.removeItem(item);
        }
      }
    }
  }

  async clearCart(): Promise<void> {
    await this.getItem();
    this.items = [];
    localStorage.removeItem('cart');
  }
}
