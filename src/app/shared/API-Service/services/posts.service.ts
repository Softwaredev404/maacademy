import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public Data = new BehaviorSubject(null);  
  constructor(private _HttpClient:HttpClient) { }

  Get():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listAvailableOffers`);
   }
 
    Create(data : object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addAvailableOffers?`, data);
   }
 
    Update(data : object, id:number):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/updateAvailableOffers/${id}?`, data);
   }
 
    Delete(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteAvailableOffers/${id}?`);
   }
   rearrangebeforposts(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/arrangeAvailableOffers`, data);
  }
  
}
