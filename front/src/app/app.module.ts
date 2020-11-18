import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';
import { CartService } from './products/cart.service';
import { CreateProductComponent } from './admin/admin-products/create-product/create-product.component';
import { ProductListComponent } from './admin/admin-products/product-list/product-list.component';
import { EditProductComponent } from './admin/admin-products/edit-product/edit-product.component';
import { ApiProductService } from './services/api-product.service';
import { CarouselComponent } from './pages/home/carousel/carousel.component';
import { PcategoryComponent } from './pages/pcategory/pcategory.component';
import { Page404Component } from './pages/page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    ProductsComponent,
    CartComponent,
    CreateProductComponent,
    ProductListComponent,
    EditProductComponent,
    CarouselComponent,
    PcategoryComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi : true
    },
    ApiProductService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
