import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubcourseService } from './../../../../shared/API-Service/services/subcourse.service';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';

@Component({
  selector: 'app-insert-subcourse',
  templateUrl: './insert-subcourse.component.html',
  styleUrls: ['./insert-subcourse.component.css']
})
export class InsertSubcourseComponent implements OnInit {
SubSubjectForm:FormGroup;
button:boolean = false;
update:boolean = false;
recordtoupdate:any ;
courses:any [];
  constructor(private _SubcourseService:SubcourseService
             ,private _FormBuilder:FormBuilder
             ,private _Router:Router
             ,private _CoursesService:CoursesService) { }

  ngOnInit(): void {
      this.getdropdown();
     this._SubcourseService.SubSubject.subscribe((res) => {
      if( res == null){
        this.initiate();
      }else{
        this.recordtoupdate = res;
        this.update = true;
        this.checkupdate(this.recordtoupdate);
      }
     }) 
  }
  initiate(){
    this.SubSubjectForm = this._FormBuilder.group({
      subSubjectName: ['', Validators.required],
      subjectId: ['', Validators.required],
    });
  }
  get fc(){
    return this.SubSubjectForm.controls;
  }
  
  checkupdate(data?:any){
    this.SubSubjectForm = this._FormBuilder.group({
      subSubjectName: [data.subSubjectName, Validators.required],
      subjectId: [data.subjectId, Validators.required]
    });
  }

getdropdown(){
   this._CoursesService.GetCourse().subscribe((res) => {
    this.courses = res.data;
   })
}

  onSubmit(){
    this.button = true;
    if( this.SubSubjectForm.status == "VALID" && this.update == false){
      this._SubcourseService.CreateSubCourse(this.SubSubjectForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل تصنيف المادة بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.SubSubjectForm.reset();
       this._Router.navigate(['content/admin/ViewSubSubject']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.SubSubjectForm.status == "VALID" && this.update == true){
      this._SubcourseService.UpdateSubCourse(this.SubSubjectForm.value , this.recordtoupdate.subSubjectId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل تصنيف المادة بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.SubSubjectForm.reset();
       this._Router.navigate(['content/admin/ViewSubSubject']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
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
  this._SubcourseService.SubSubject.next(null);
   }
}
