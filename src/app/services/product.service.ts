import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:3000/api/get_products';
  private urlpost = 'http://localhost:3000/api/add_product';
  private urldelete = 'http://localhost:3000/api/delete_product';
  private urlput = 'http://localhost:3000/api/update_product';
  //muy importante que las urls coincidan en front y back
  
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url).pipe(catchError(this.handleError<any>('getProducts')));
  }

  addNewProduct(name:string,price:number,description:string):Observable<object>{

    const data = {name:name,price:price,description:description};


    return this.httpClient.post(this.urlpost,{info:data},{observe:'body'}).pipe(catchError(this.handleError<any>('addNewProduct')));
  }

  updateProduct(_id:string,name:string,description:string,price:number):Observable<object>{
    return this.httpClient.put(this.urlput,{_id:_id,name:name,description:description,price:price},{observe:'response'}).pipe(catchError(this.handleError<any>('updateProduct')));
  }
  
  deleteProduct(id:string):Observable<object>{

    return this.httpClient.delete(this.urldelete+'/'+id,{observe:'body'}).pipe(catchError(this.handleError<any>('deleteProduct')))
  }

  private handleError<T>(operation = 'opearation',result?:T){
    return (error:any):Observable<T>=>{
      // TODO: send the error to remote logging infrastructure
      console.error(error);// log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
