import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { ProductService } from 'src/app/products/services/product.service';

function notEmpty(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        return !value || !value.trim() ? { empty: true } : null;
    }
}

function isTodayOrAfter(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        
        if(!value) return null;

        let [year,month,date] = value.split('-');
        const today = new Date();

        if(
            year < today.getFullYear() ||
            (year == today.getFullYear() && month < today.getMonth()+1) ||
            (year == today.getFullYear() && month == today.getMonth()+1 && date < today.getDate())
        ){
            return { beforeToday: true };
        }
        return null;
    }
}

function productIDExists(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors|null> => {
        if(control.errors || !control.value) return of(null);

        return productService.validateIDProduct(control.value)
                             .pipe(
                                map((result: boolean) =>
                                    result ? { productIDExists: true } : null
                                )
                             );
    }
}

export { 
    isTodayOrAfter,
    notEmpty,
    productIDExists
}