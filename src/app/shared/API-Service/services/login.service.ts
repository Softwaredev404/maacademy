import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _HttpClient:HttpClient) { }




 user_login(person):Observable<any>{
  return this._HttpClient.post(`${environment.Server_URL}/signin`, person);
 }

 
}
