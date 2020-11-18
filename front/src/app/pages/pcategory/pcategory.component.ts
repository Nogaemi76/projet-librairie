import { Component, OnInit } from '@angular/core';
import { ApiProductService } from './../../services/api-product.service';

@Component({
  selector: 'app-pcategory',
  templateUrl: './pcategory.component.html',
  styleUrls: ['./pcategory.component.css']
})
export class PcategoryComponent implements OnInit {

  Product: any = [];

  constructor(private apiProductService: ApiProductService) {
    this.readProduct();
  }

  ngOnInit() {
  }

  readProduct(){
    this.apiProductService.getProducts().subscribe((data) => {
      this.Product = data;
    });
  }

}
