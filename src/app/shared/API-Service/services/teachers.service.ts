import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  public Teacher = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }

   GetTeacher():Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/listTeacher`);
  }
   CreateTeacher(data : object):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addTeacher`, data);
  }
   UpdateTeacher(data : object, id:number):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/updateTeacher/${id}?`, data);
  }
   DeleteTeacher(id:number):Observable<any>{
   return this._HttpClient.delete(`${environment.Server_URL}/deleteTeacher/${id}`);
  }
  TeacherCourse(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listTeacherSubjectContent/${id}`);
  }

  GetStudentForTeacher(teacherId:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listStudentTeacher/${teacherId}`);
  }
}
