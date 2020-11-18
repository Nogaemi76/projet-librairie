import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from './../../models/product';
import { Item } from './../item';
import { CartService } from './../cart.service';
import { ApiProductService } from './../../services/api-product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private items: Item[] = [];
  private total: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const item: Item = {
          product: this.cartService.findaproduct(id),
          quantity: 1
        };
        if (localStorage.getItem('cart') == null) {
          const cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          const cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (let i = 0; i < cart.length; i++) {
            const item: Item = JSON.parse(cart[i]);
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            const item: Item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
    });
  }

  loadCart() {
    this.total = 0;
    this.items = [];
    const cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      const item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  remove(id: string) {
    const cart: any = JSON.parse(localStorage.getItem("cart"));
    const index: number = -1;
    for (let i = 0; i < cart.length; i++) {
      const item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }
}
