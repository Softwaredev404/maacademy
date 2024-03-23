import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EducationLevelService {

  public EducationLevel = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }
  
   // This to get the education level 
   GetEducationLevel():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listEducationLevel`);
   }
 // This to post the education level 
  CreateEducationLevel(record):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addEducationLevel`, record);
  }
 // This to Update the education level
  UpdateEducationLevel(record, id:number):Observable<any>{
   return this._HttpClient.put(`${environment.Server_URL}/updateEducationLevel/${id}?`, record);
  }
  // This to delete the education level
 DeleteEducationLevel(id):Observable<any>{
   return this._HttpClient.delete(`${environment.Server_URL}/deleteEducationLevel/${id}?`); 
 }

}
