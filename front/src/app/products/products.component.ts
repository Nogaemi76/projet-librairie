import { Component, OnInit } from '@angular/core';
import { ApiProductService } from './../services/api-product.service';

import { CartService } from './cart.service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  Product: any = [];

  constructor(private apiProductService: ApiProductService) {
    this.readProduct();
  }

  ngOnInit() {
  }

  readProduct() {
    this.apiProductService.getProducts().subscribe((data) => {
      this.Product = data;
    });
  }

}
