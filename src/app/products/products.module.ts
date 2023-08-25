import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    CoreModule
  ]
})
export class ProductsModule { }
