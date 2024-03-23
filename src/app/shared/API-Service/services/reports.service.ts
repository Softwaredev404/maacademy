import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  public Data = new BehaviorSubject(null);  
  constructor(private _HttpClient:HttpClient) { }

  Get(id:number , data:any):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/show?studentId=${id}`, data);
   }
   
}
