import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  public coursecontent = new BehaviorSubject(null);
  public insertnewcoursecontent = new BehaviorSubject(null);
  public studentemail = new BehaviorSubject(null);
  public insertpdfId = new BehaviorSubject(null);
  public updatepdfId = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }


  GetCourseContent():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listSubjectContent`);
  }

  GetCourseContentPage(page:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listSubjectContent/${page}`);
  }

  CreateCourseContent(data : any):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addSubjectContent`, data);
  }

  UpdateCourseContent(data : any,id : number):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/updateSubjectContent/${id}`, data);
  }

  DeleteCourseContent(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteSubjectContent/${id}`);
  }
  insertPdf(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addPdfSubjectContent`, data);
  }
  updatePdf(id:number ,data:any):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/updatePdfSubjectContent/${id}`, data);
  }
  updateFlagPdf(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/updateFlag/${id}`);
  }
  ListPdf(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listPdfSubjectContent/${id}`);
  }
 
  deletepdf(id:number):Observable<any>{
   return this._HttpClient.delete(`${environment.Server_URL}/deletePdfSubjectContent/${id}`);
  }
  // ====================================
  // this is for activation a student
  viewactivation(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listStudentSubjectContents/${id}`)
  }
  insertactivation(data : any):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/StudentSubjectContents/store`, data);
  }
  insertactivationcoursecontent(data : any):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addStudentSubjectContentActivation?`, data);
  }
  updateactivation(data:any , id:number):Observable<any>{
    return this._HttpClient.put(`${environment.Server_URL}/updateStudentSubjectContents/${id}`, data);
  }
  // ===========================================
  // Remove Zoom URL
  RemoveZoomURL(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/expireZoom/${id}`)
  }
}

