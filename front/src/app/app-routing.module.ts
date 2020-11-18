import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './shared/auth.guard';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { CreateProductComponent } from './admin/admin-products/create-product/create-product.component';
import { EditProductComponent } from './admin/admin-products/edit-product/edit-product.component';
import { ProductListComponent } from './admin/admin-products/product-list/product-list.component';
import { PcategoryComponent } from './pages/pcategory/pcategory.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'products', component: ProductsComponent,
      children: [
        { path: 'cart', component: CartComponent }
      ]
  },
  { path: 'admin', component: AdminComponent,
      children: [
        { path: 'products', component: AdminProductsComponent,
            children: [
              { path: 'create-product', component: CreateProductComponent },
              { path: 'edit-product/:id', component: EditProductComponent },
              { path: 'product-list', component: ProductListComponent }
            ]
       },
        { path: 'users', component: AdminUsersComponent }
      ]
  },
  { path: 'category', component: PcategoryComponent},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
