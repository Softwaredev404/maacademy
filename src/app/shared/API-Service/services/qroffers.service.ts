import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QroffersService {

  public Data = new BehaviorSubject(null);
  public Lesson = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }

  CreateQR(data : object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addQROffers?`, data);
   }
  UpdateQR(data : object, id : number):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/updateQROffers/${id}`, data);
   }
  UpdateSubjectQR(data : any, id : number):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/updateQRSubjectContent/${id}?`, data);
   }
  GetQR():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listQROffers`);
  }
  GetLessonQR():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listQRSubjectContent`);
  }

  DeleteQR(id : number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteQROffers/${id}`);
  }
  DeleteSubjectQR(id : number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteQRSubjectContent/${id}`);
  }

  // for the subject offers 
  CreateSubjectQR(data : object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addQRSubjectContent?`, data);
   }
 
}
