import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
import { SubcourseService } from './../../../../shared/API-Service/services/subcourse.service';
@Component({
  selector: 'app-insert-subcoursecontent',
  templateUrl: './insert-subcoursecontent.component.html',
  styleUrls: ['./insert-subcoursecontent.component.css']
})
export class InsertSubcoursecontentComponent implements OnInit {
  subcoursecontentForm:FormGroup;
  button:boolean = false;
  update:boolean = false;
  recordtoupdate:any;
  subjects:any;
  dropdownSettings:any = {};
  subsubjects:any [];
  constructor(private _Router:Router
             ,private _FormBuilder:FormBuilder
             ,private _SubcoursecontentService:SubcoursecontentService
             ,private _SubcourseService:SubcourseService) { }

  ngOnInit(): void {
    this._SubcourseService.SubSubject.subscribe((res) => {
      this.getdropdowns();
      if( res == null){
        this._SubcoursecontentService.SubjectContent.subscribe((updatedata) => {
          if( updatedata == null){
           this.initiate();
          }else{
            this.recordtoupdate = updatedata;
           this.checkedit(this.recordtoupdate);
           this.update = true;
          }
        })
      }else{
        this.initiate(res);
      }
    })
  }

  initiate(id?:number){
    this.subcoursecontentForm = this._FormBuilder.group({
      beforSubjectContentName: ['', Validators.required],
      subSubjectId: [id || '', Validators.required]
    });
  }
  checkedit(data:any){
    this.subcoursecontentForm = this._FormBuilder.group({
      beforSubjectContentName: [data.beforSubjectContentName, Validators.required],
      subSubjectId: [data.subSubjectId, Validators.required]
    });
  }
  getdropdowns(){
    this._SubcourseService.GetSubCourse().subscribe((res) => {
      this.subsubjects = res.data;
    });
  }
  get fc(){
    return this.subcoursecontentForm.controls;
  }


  onSubmit(){
    this.button = true;
    if( this.subcoursecontentForm.status == "VALID" && this.update == false){
      this._SubcoursecontentService.CreateSubjectContent(this.subcoursecontentForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل تصنيف المحتوى بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.subcoursecontentForm.reset();
       this._Router.navigate(['content/admin/ViewSubCourseContent']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.subcoursecontentForm.status == "VALID" && this.update == true){
      this._SubcoursecontentService.UpdateSubjectContent(this.subcoursecontentForm.value, this.recordtoupdate.beforSubjectContentId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل تصنيف المحتوى بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.subcoursecontentForm.reset();
       this._Router.navigate(['content/admin/ViewSubCourseContent']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'لم تقم بتغيير اي شئ',
             });
             this.button = false;
       })
    }
    else{
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
    }
  }

  ngOnDestroy(){
    this._SubcoursecontentService.SubjectContent.next(null);
  }
}
