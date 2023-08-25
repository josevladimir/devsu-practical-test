import { Component, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FinancialProduct } from '../../interfaces/financial-product.interface';
import { normalizeToSearch } from 'src/app/core/utils/string.util';
import { SpinnerService } from '../../../core/services/spinner.service';
import { NotificationBarService } from 'src/app/core/services/notification-bar.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {

  private products: FinancialProduct[] = [];
  public productsFiltered: FinancialProduct[] = [];

  public amountToSlice: number = 5;
  public selectedItem: number|null;

  searchControl: FormControl = new FormControl('')

  constructor(
    private productService: ProductService,
    private notificationBarService: NotificationBarService,
    private spinnerService: SpinnerService
  ) {
    this.loadProducts();
    this.searchControl.valueChanges.subscribe({
      next: (searchTerm: any) => {
        this.productsFiltered = this.products.filter((product: FinancialProduct) => normalizeToSearch(product.name).includes(normalizeToSearch(searchTerm)));
      }
    })
  }

  @HostListener('click', ['$event.target'])
  click(target: any){
    if(target.attributes.getNamedItem('data-role')?.value != 'menu-toggle') this.selectedItem = null;
  }

  deleteProduct(product: FinancialProduct){
    if(confirm(`¿Está seguro que desear eliminar el producto ${product.name}?`)){
      this.spinnerService.startLoading();
      this.productService.deleteProduct(product.id).subscribe({
        next: (response) => {
          this.loadProducts();
          this.notificationBarService.alert(`Se ha eliminado el producto ${product.name}`,'success');
        },
        error: (error: any) => {
          this.spinnerService.stopLoading();
          if(error.status == 404) this.notificationBarService.alert('El producto que trata de eliminar, no existe','error');
          else if(error.status == 400) this.notificationBarService.alert('No tiene permisos para eliminar este producto','error');
        }
      });
    }
  }

  loadPlaceholder(target: any){
    target.src = '../../../assets/imgs/products-logo-default.png';
  }

  loadProducts(){
    this.spinnerService.startLoading();
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.productsFiltered = this.products.slice(0, this.amountToSlice);
        this.spinnerService.stopLoading();
      },
      error: (error) =>{
        this.spinnerService.stopLoading();
        this.notificationBarService.alert('Ha ocurrido un error al cargar los productos financieros', 'error');
      }
    });
  }

  showContextualMenu(index: number){
    this.selectedItem = index;
  }

  sliceProducts(): void{
    this.productsFiltered = this.products.slice(0, this.amountToSlice);
  }

}
