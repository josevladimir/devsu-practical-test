import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: { post: jasmine.Spy, get: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post','put','delete']);
    service = new ProductService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 200 at product creation', (done: DoneFn) => {
    let mockData: any = {
      id: 'nuevo-id4',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    };
    let mockResponse = {
      body: {id: 'nuevo-id4',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'},
      status: 200
    }

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.createProduct(mockData).subscribe({
      next: (response) => {
        expect(response.status).toEqual(200);
        done();
      }
    })
  });

  it('should return true at validate id product', (done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(true));

    service.validateIDProduct('nuevo').subscribe({
      next: (response) => {
        expect(response).toEqual(true);
        done();
      }
    })
  });
  
  it('should return true at validate id product', (done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(false));

    service.validateIDProduct('123').subscribe({
      next: (response) => {
        expect(response).toEqual(false);
        done();
      }
    })
  });

  it('should return 200 at delete product', (done: DoneFn) => {

    httpClientSpy.delete.and.returnValue(of(200));

    service.deleteProduct('prueba-123').subscribe({
      next: (response) => {
        expect(response).toEqual(200);
        done();
      }
    })
  });
  
  it('should return 200 at update product', (done: DoneFn) => {
    let mockData: any = {
      id: 'nuevo-id4',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    };
    let mockResponse = {
      body: {id: 'nuevo-id4',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'},
      status: 200
    }

    httpClientSpy.put.and.returnValue(of(mockResponse));

    service.updateProduct(mockData).subscribe({
      next: (response) => {
        expect(response.status).toEqual(200);
        done();
      }
    })
  });

  it('should return product list', (done: DoneFn) => {
    let mockData: any = [{
      id: 'nuevo-id4',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    },
    {
      id: 'nuevo-id5',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    },
    {
      id: 'nuevo-id6',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    },
    {
      id: 'nuevo-id7',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    }];

    httpClientSpy.get.and.returnValue(of(mockData));

    service.getProducts().subscribe({
      next: (response) => {
        expect(response).toEqual(mockData);
        done();
      }
    })
  });

  it('should return product by id', (done: DoneFn) => {
    let mockData: any = [{
      id: 'nuevo-id4',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    },
    {
      id: 'nuevo-id5',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    },
    {
      id: 'nuevo-id6',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    },
    {
      id: 'nuevo-id7',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    }];
    let mockResponse: any = {
      id: 'nuevo-id4',
      name: 'Nombre del Producto',
      description: 'Description',
      logo: 'url',
      date_release: '2023-09-07',
      date_revision: '2024-09-07'
    }

    httpClientSpy.get.and.returnValue(of(mockData));

    service.getById('nuevo-id4').subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
        done();
      }
    })
  });

});
