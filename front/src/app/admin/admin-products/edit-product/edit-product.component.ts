import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProductService } from './../../../services/api-product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  productData: Product[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiProductService: ApiProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateProduct();
    // let id = this.actRoute.snapshot.paramMap.get('_id');
    let id = this.actRoute.snapshot.params.id;
    console.log(id);
    this.getProduct(id);
    console.log(this.getProduct(id));
    this.editForm = this.fb.group({
      // albumtitle: ['', Validators.required],
      // seriestitle: ['', Validators.required],
      // seriesnumber: ['', Validators.required],
      // writer: ['', Validators.required],
      // artist: ['', Validators.required],
      // price: ['', Validators.required],
      // isbn: ['', Validators.required],
      // imageurl: ['', Validators.required],
      // imageurlthumb: ['', Validators.required]
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

  get myForm() {
    return this.editForm.controls;
  }

  getProduct(id) {
    this.apiProductService.getProduct(id).subscribe(data => {
      this.editForm.setValue({
        albumtitle: data['albumtitle'],
        seriestitle: data['seriestitle'],
        seriesnumber: data['seriesnumber'],
        writer: data['writer'],
        artist: data['artist'],
        price: data['price'],
        isbn: data['isbn'],
        imageurl: data['imageurl'],
        imageurlthumb: data['imageurlthumb'],
      });
      console.log('bbbbbbebebebe');
      console.log(data);
    });
  }

  updateProduct() {
    this.editForm = this.fb.group({
      albumtitle: ['', Validators.required],
      seriestitle: ['', Validators.required],
      seriesnumber: ['', Validators.required],
      writer: ['', Validators.required],
      artist: ['', Validators.required],
      price: ['', Validators.required],
      isbn: ['', Validators.required],
      imageurl: ['', Validators.required],
      imageurlthumb: ['', Validators.required]
      // albumtitle: [''],
      // seriestitle: [''],
      // seriesnumber: [''],
      // writer: [''],
      // artist: [''],
      // price: [''],
      // isbn: [''],
      // imageurl: [''],
      // imageurlthumb: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      alert('Certains champs ne sont pas remplis');
      return false;
    } else {
      if (window.confirm('Confirmez-vous ces modifications ?')) {
        let id = this.actRoute.snapshot.params.id;
        this.apiProductService.updateProduct(id, this.editForm.value)
        .subscribe (res => {
          this.router.navigateByUrl('/admin/products/product-list');
          console.log('Product successfully updated');
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

}
