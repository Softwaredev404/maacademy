import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeacherRequestService {
  public Subject = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }

   GetPdfRequests():Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/listRequestPdf`);
  }
   GetExamsRequests():Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/listRequestExam`);
  }

   approveRequest(RequestId : number):Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/approvepdfteacher/${RequestId}`);
  }
   approveExamRequest(RequestId : number):Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/approveexamsteacher/${RequestId}`);
  }
   denyRequest(RequestId : number):Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/denypdfteacher/${RequestId}`);
  }
   denyExamRequest(RequestId : number):Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/denyexamteacher/${RequestId}`);
  }
}
