import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public user = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }

   

   CreateAdmin(data : object):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/createUser`, data);
  }
  
   GetUsers():Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/listUsers`);
  }
   createAnnounce(data : object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addAnnounce`, data);
   }
   Anannouncements():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listAnnounce`);

   } 
   deleteAnnounce(id : number):Observable<any>{
   
    return this._HttpClient.delete(`${environment.Server_URL}/deleteAnnounce/${id}?`);
   } 

  //  updateuser(record:any, id:number):Observable<any>{
  //   return this._HttpClient.put(`${environment.Server_URL}/register/${id}/`, record);
  //  }
   DeleteUser(id : number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteUser/${id}?`);
   }
   UpdateUser(data:object, id:number):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/updateUser/${id}?`, data);
   }
}
