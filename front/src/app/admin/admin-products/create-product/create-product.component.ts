import { Router } from '@angular/router';
import { ApiProductService } from './../../../services/api-product.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  submitted = false;
  productForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiProductService: ApiProductService
  ) {
    this.mainForm();
  }

  mainForm() {
    this.productForm = this.fb.group({
      // albumtitle: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      // albumtitle: ['', [Validators.required, Validators.minLength(6)]],
      // albumtitle: ['', Validators.required],
      // seriestitle: ['', Validators.required],
      // seriesnumber: ['', Validators.required],
      // writer: ['', Validators.required],
      // artist: ['', Validators.required],
      // price: ['', Validators.required],
      // isbn: ['', Validators.required],
      // imageurl: ['', Validators.required],
      // imageurlthumb: ['', Validators.required],
      albumtitle: [''],
      seriestitle: [''],
      seriesnumber: [''],
      writer: [''],
      artist: [''],
      price: [''],
      isbn: [''],
      imageurl: [''],
      imageurlthumb: ['']
    });
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      isbn: [''],
      seriestitle: [''],
      albumtitle: [''],
      seriesnumber: [''],
      writer: [''],
      artist: [''],
      price: [''],
      imageurl: [''],
      imageurlthumb: [''],
    });
  }

  get myForm() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.productForm.valid) {
      console.log('form is not working');
      return false;
    } else {
      this.apiProductService.createProduct(this.productForm.value).subscribe(
        (res) => {
          console.log('Product Successfully created');
          this.ngZone.run(() => this.router.navigateByUrl('/admin/products/product-list'));
        }, (error) => {
          console.log(error);
        }
      );
    }
  }
}
