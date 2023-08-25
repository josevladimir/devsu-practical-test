import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormControl, Validators } from '@angular/forms';
import { isTodayOrAfter, notEmpty, productIDExists } from '../../utils/forms-validators.util';
import { By } from '@angular/platform-browser';
import { debounceTime, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/products/services/product.service';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let productService: ProductService;
  let httpClientSpy: {get: jasmine.Spy };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post','put','delete']);
    productService = new ProductService(httpClientSpy as any);

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if exists an error', () => {
    component.control = new FormControl('',[
      Validators.required,
      notEmpty(),
      Validators.minLength(3),
      Validators.maxLength(25),
      isTodayOrAfter()
    ]);
    
    expect(component.parseError(component.control?.errors!)).toEqual('Este campo es requerido');
    
    component.control?.setValue('  ');
    expect(component.parseError(component.control?.errors!)).toEqual('Este campo no puede quedar en blanco');
    
    component.control?.setValue('12');
    expect(component.parseError(component.control?.errors!)).toEqual('Debe tener al menos 3 caracteres');

    component.control?.setValue('12333333333333333333333333333');
    expect(component.parseError(component.control?.errors!)).toEqual('Debe tener máximo 25 caracteres');

    component.control?.setValue('2023-01-01');
    expect(component.parseError(component.control?.errors!)).toEqual('La fecha no puede ser anterior a la actual');

  });

  it('should check if exists an error with async validator', (done: DoneFn) => {
    component.control = new FormControl('',[],[productIDExists(productService)]);

    httpClientSpy.get.and.returnValue(of(true));

    component.control?.setValue('123');
    expect(component.parseError(component.control?.errors!)).toEqual('El ID ingresado no está disponible');
    done();
    
  });

});

