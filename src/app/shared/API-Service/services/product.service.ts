import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public Data = new BehaviorSubject(null)
  

  constructor(private _HttpClient:HttpClient) { }
  // This to get the products 
  Get():Observable<any>{
   
   return this._HttpClient.get(`${environment.Server_URL}/Product/Get`);
  }
// This to post the products 
 Create(product):Observable<any>{
 
  return this._HttpClient.post(`${environment.Server_URL}/Product/Create`, product  );
 }
// This to Update the products
 Update(product_update):Observable<any>{
 
  return this._HttpClient.post(`${environment.Server_URL}/Product/Update`, product_update  );
 }
 // This to delete the products
Delete(id):Observable<any>{
  
  return this._HttpClient.get(`${environment.Server_URL}/Product/Delete?id=${id}` ); 
}



}
