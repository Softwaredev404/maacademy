import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public Subject = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) { }

  GetCourse(): Observable<any> {
    return this._HttpClient.get(`${environment.Server_URL}/listSubject`);
  }

  CreateCourse(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.Server_URL}/addSubject`, data);
  }

  UpdateCourse(data: object, id: number): Observable<any> {
    return this._HttpClient.post(`${environment.Server_URL}/updateSubject/${id}?`, data);
  }

  toggleCourse(subjectContentId:number, subjectContentFlag:number): Observable<any> {
    return this._HttpClient.post(`${environment.Server_URL}/showSubjectContent/${subjectContentId}?subjectContentFlag=${subjectContentFlag}`, null);
  }

  DeleteCourse(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.Server_URL}/deleteSubject/${id}?`);
  }
}
