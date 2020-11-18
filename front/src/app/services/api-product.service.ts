import { Injectable } from '@angular/core';
import { Product } from './../models/product';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class ApiProductService {

  endpoint: string = 'http://localhost:4000/products';
  headers = new HttpHeaders().set('Content-type', 'application/json');

  constructor(
    private http: HttpClient,
    // public router: Router
    ) { }

  createProduct(data): Observable<any> {
    let url = `${this.endpoint}/addproduct`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
        );
  }

  getProducts() {
    return this.http.get(`${this.endpoint}`);
  }

  getProduct(id): Observable<any> {
    let url = `${this.endpoint}/getaproduct/${id}`;
    // console.log(url);
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        // console.log(res);
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  updateProduct(id, data): Observable<any> {
    let url = `${this.endpoint}/updateproduct/${id}`;
    console.log(url);
    return this.http.put(url, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  deleteProduct(id): Observable<any> {
    let url = `${this.endpoint}/deleteproduct/${id}`;
    return this.http.delete(url, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      // get client-side error
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // get server-side error
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

