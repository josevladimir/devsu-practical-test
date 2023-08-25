import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { parseDateToInputFormat } from 'src/app/core/utils/date.util';
import { isTodayOrAfter, notEmpty, productIDExists } from 'src/app/core/utils/forms-validators.util';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialProduct } from '../../interfaces/financial-product.interface';
import { SpinnerService } from '../../../core/services/spinner.service';
import { NotificationBarService } from 'src/app/core/services/notification-bar.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  public newProductForm: FormGroup;
  private financialProduct: FinancialProduct;
  public editMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationBarService: NotificationBarService,
    private productService: ProductService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {
    if(location.pathname.split('/')[2] == 'edit'){
      this.spinnerService.startLoading();
      this.editMode = true;
      this.activatedRoute.params.subscribe({
        next: (params: any) => this.productService.getById(params.id).subscribe({
          next: (product: FinancialProduct|undefined) => {
            this.spinnerService.stopLoading()
            if(product){
              this.financialProduct = product;
              this.loadForm();
            }else{
              this.router.navigate(['/products']);
              this.notificationBarService.alert('El producto que intenta ver, no existe','info');
            }
          }
        })
      })
    }else this.loadForm();

  }
  
  loadForm(){
    let date_release, date_revision: string|null = null;
    if(this.financialProduct){
      date_release = parseDateToInputFormat(new Date(this.financialProduct.date_release));
      date_revision = parseDateToInputFormat(new Date(this.financialProduct.date_revision));
    }
    
    this.newProductForm = new FormGroup({
      id: new FormControl(this.financialProduct?.id || '', [Validators.required, notEmpty(), Validators.minLength(3), Validators.maxLength(10)], [productIDExists(this.productService)]),
      name: new FormControl(this.financialProduct?.name || '', [Validators.required, notEmpty(), Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl(this.financialProduct?.description || '', [Validators.required, notEmpty(), Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl(this.financialProduct?.logo || '', [Validators.required, notEmpty()]),
      date_release: new FormControl(date_release || '', [Validators.required, notEmpty(), isTodayOrAfter()]),
      date_revision: new FormControl(date_revision || '', [Validators.required, notEmpty()]),
    });
    this.newProductForm.get('date_revision')?.disable();
    if(this.editMode) this.newProductForm.get('id')?.disable();
  }

  resetForm(){
    this.newProductForm.reset();
  }
  
  send(){
    this.spinnerService.startLoading();

    let formValue: any = this.newProductForm.value;
    formValue.date_revision = this.newProductForm.get('date_revision')?.value;

    if(this.editMode){
      formValue.id = this.newProductForm.get('id')?.value;
      this.productService.updateProduct(formValue).subscribe({
        next: (response: any) => {
          if(response.status == 200){
            this.router.navigate(['/products']);
            this.notificationBarService.alert('Producto actualizado!','success');
          }else{
            this.notificationBarService.alert('Debe completar todos los campos','info');
          }
        },
        error: (error: any) => {
          this.spinnerService.stopLoading();
          if(error.status == 401) this.notificationBarService.alert('Solo puede editar los productos creados por ud', 'error');
          else this.notificationBarService.alert('Algo ha salido mal, por favor, reintente', 'error');
        }
      });
    }else {
      this.productService.createProduct(formValue).subscribe({
        next: (response: any) => {
          if(response.status == 200){
            this.router.navigate(['/products']);
            this.notificationBarService.alert('Producto registrado!','success');
          }else{
            this.notificationBarService.alert('Debe completar todos los campos','info');
          }
        },
        error: (error: any) => this.notificationBarService.alert('Algo ha salido mal, por favor, reintente', 'error'),
        complete: () => this.spinnerService.stopLoading()
      });
    }
  }
  
  setDates(){
    if(this.newProductForm.get('date_release')?.valid){
      let [year,month,date] = this.newProductForm.get('date_release')?.value.split('-').map((str: string) => parseInt(str));
      let revisionDate = parseDateToInputFormat(new Date(year+1,month-1,date));
      this.newProductForm.get('date_revision')?.setValue(revisionDate);
    }
  }

}
