import { Component, OnInit } from '@angular/core';
import { ApiProductService } from './../../../services/api-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

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

  removeProduct(product, index) {
    if (window.confirm('Voulez-vous vraiment effacer ce produit ?')) {
      this.apiProductService.deleteProduct(product._id).subscribe((data) => {
        this.Product.splice(index, 1);
      });
    }
  }

}
