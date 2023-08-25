import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FinancialProduct } from '../interfaces/financial-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
  private headers: HttpHeaders = new HttpHeaders({'authorId': '123456789'});

  constructor(
    private http: HttpClient
  ) { }

  createProduct(product: FinancialProduct): Observable<any>{
    return this.http.post(`${this.BASE_URL}/bp/products`, product, {headers: this.headers, observe: 'response'})
                    .pipe(
                      map(response => ({...response.body, status: response.status}))
                    );
  }

  deleteProduct(id: string): Observable<any>{
    let params: HttpParams = new HttpParams().append('id',id);
    return this.http.delete(`${this.BASE_URL}/bp/products`, {headers: this.headers, params});
  }

  getProducts(): Observable<FinancialProduct[]>{
    return this.http.get<FinancialProduct[]>(`${this.BASE_URL}/bp/products`, {headers: this.headers});
  }

  getById(id: string): Observable<FinancialProduct | undefined>{
    return this.getProducts().pipe(map((products: FinancialProduct[]) => products.find((product: FinancialProduct) => product.id == id)));
  }
  
  updateProduct(product: FinancialProduct): Observable<any>{
    return this.http.put(`${this.BASE_URL}/bp/products`, product, {headers: this.headers, observe: 'response'})
                    .pipe(
                      map(response => ({...response.body, status: response.status}))
                    );
  }

  validateIDProduct(id: string): Observable<boolean>{
    let params: HttpParams = new HttpParams().append('id',id);
    return this.http.get<boolean>(`${this.BASE_URL}/bp/products/verification`, {params});
  }

}
