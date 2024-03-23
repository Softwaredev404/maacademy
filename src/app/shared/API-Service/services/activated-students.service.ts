import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ActivatedStudentsService {

  constructor(private _HttpClient:HttpClient) { }

  GetActivatedStudents(id):Observable<any>{
  return this._HttpClient.get(`${environment.Server_URL}/countStudentBefore/${id}`);
  }
  deleteActivatedStudents(id, data):Observable<any>{
  return this._HttpClient.post(`${environment.Server_URL}/deleteStudentBefore/${id}`, data);
  }
}
