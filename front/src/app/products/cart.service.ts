import { Injectable } from '@angular/core';

import { Product } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[];

  constructor() {
    this.products = [
    //   { id: "p01", albumtitle: this.products.albumtitle, price: 100 },
    //   { id: "p02", albumtitle: "name 2", price: 200 },
    //   { id: "p03", albumtitle: "name 3", price: 300 }
    ];
  }

  findAllProducts(): Product[] {
    return this.products;
  }

  findaproduct(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }


}
