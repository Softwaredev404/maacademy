import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class SubcoursecontentService {
  public SubjectContent = new BehaviorSubject(null);
  public RearrangeSubjectContent = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) { }

  GetSubjectContent(page?:number): Observable<any> {
    if(page !== undefined)
    return this._HttpClient.get(`${environment.Server_URL}/listBeforSubjectContent/${page}`);
    else
    return this._HttpClient.get(`${environment.Server_URL}/listBeforSubjectContent`);
  }

  CreateSubjectContent(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.Server_URL}/addBeforSubjectContent`,
      data
    );
  }
  showSubjectContent(beforSubjectContentId: any, beforeFlag: any): Observable<any> {
    return this._HttpClient.get(
      `${environment.Server_URL}/showBeforSubjectContent/${beforSubjectContentId}?beforeFlag=${beforeFlag}`
    );
  }
  UpdateSubjectContent(data: object, id: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.Server_URL}/updateBeforSubjectContent/${id}?`,
      data
    );
  }

  DeleteSubjectContent(id: number): Observable<any> {
    return this._HttpClient.delete(
      `${environment.Server_URL}/deleteBeforSubjectContent/${id}`
    );
  }

  filtersubjectcontent(id: number): Observable<any> {
    return this._HttpClient.get(
      `${environment.Server_URL}/filterBeforSubjectContent/${id}`
    );
  }
  searchInSubCourses(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/beforSubjectContent/search`, data);
  }

  searchInCourses(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/subjectContent/search`, data);
  }
}
