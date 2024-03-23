import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {

  public updateparent = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }

  GetParents():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/fatherList`);
   }
 
    CreateParents(data : object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addFather`, data);
   }
 
    UpdateParents(data : object, id:number):Observable<any>{
    return this._HttpClient.put(`${environment.Server_URL}/updateFather/${id}?`, data);
   }
 
    DeleteParents(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteFather/${id}?`);
   }
}
