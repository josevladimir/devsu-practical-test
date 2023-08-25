import { FormControl } from "@angular/forms";
import { isTodayOrAfter, notEmpty, productIDExists } from "./forms-validators.util";
import { parseDateToInputFormat } from "./date.util";
import { ProductService } from "src/app/products/services/product.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

describe('FormsValidatorsUtils', () => {    

    let productService: ProductService;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        productService = new ProductService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(productService).toBeTruthy();
    });

    it('should check that control is not empty', () => {

        let control = new FormControl('', [notEmpty()]);

        control.setValue(' ');
        expect((control.errors || {}).hasOwnProperty('empty')).toBe(true);
        
        control.setValue('   text ');
        expect((control.errors || {}).hasOwnProperty('empty')).toBe(false);

    });

    it('should check that control date is today or after', () => {

        let control = new FormControl('', [isTodayOrAfter()]);

        control.setValue('2023-07-23');
        expect((control.errors || {}).hasOwnProperty('beforeToday')).toBe(true);
        
        let today = new Date();
        control.setValue(parseDateToInputFormat(today));
        expect((control.errors || {}).hasOwnProperty('beforeToday')).toBe(false);

    });

    
    it('should check if a id of product exists', (done: DoneFn) => {

        let control = new FormControl('', [], [productIDExists(productService)]);

        httpClientSpy.get.and.returnValue(of(true));
        
        control.setValue('123');
        expect((control.errors || {}).hasOwnProperty('productIDExists')).toBe(true);
        done();
        
    });

    
    it('should check if a id of product does not exist', (done: DoneFn) => {

        let control = new FormControl('', [], [productIDExists(productService)]);

        httpClientSpy.get.and.returnValue(of(false));
        
        control.setValue('id-nuevo');
        expect((control.errors || {}).hasOwnProperty('productIDExists')).toBe(false);
        done();
        
    });

});
