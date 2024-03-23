import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Swal from 'sweetalert2';
import { CoursesService} from '../../../../shared/API-Service/services/courses.service';
import { EducationLevelService} from '../../../../shared/API-Service/services/education-level.service';

@Component({
  selector: 'app-insert-courses',
  templateUrl: './insert-courses.component.html',
  styleUrls: ['./insert-courses.component.css']
})
export class InsertCoursesComponent implements OnInit {
CourseForm:FormGroup;
CourseFormData:FormData;
Image:File;
imageLogo:string;
update:boolean = false;
recordtoupdate:any;
button:boolean = false;
title:string = 'app';
elementType:string = NgxQrcodeElementTypes.URL;
correctionLevel  = NgxQrcodeErrorCorrectionLevels.HIGH;
QrCode:string = null;
educationlevels:any [];
  constructor(private _FormBuilder:FormBuilder
             ,private _CoursesService:CoursesService
             ,private _Router:Router
             ,private _EducationLevelService:EducationLevelService) { }

  ngOnInit(): void {
    this.getdropdown();
    this._CoursesService.Subject.subscribe((res) => {
      if(res == null){
        this.initiate();
      }else{
        this.update = true;
       this.recordtoupdate = res;
       this.imageLogo = 'https://www.maapp.misrpedia.com/public/' + res.subjectImage;
       this.checkupdate(this.recordtoupdate);
      }
    })
    
  }

  initiate(){
    this.CourseForm = this._FormBuilder.group({
      subjectName: ['', Validators.required],
      educationId: ['', Validators.required],
      description: ['', Validators.required],
      // QrCode: ['', Validators.required],
    });
  }
  checkupdate(data:any){
    this.CourseForm = this._FormBuilder.group({
      subjectName: [data.subjectName, Validators.required],
      educationId: [data.educationId, Validators.required],
      description: [data.description, Validators.required],
      // QrCode: ['', Validators.required],
    });
  }

  // imgFile
  getLogoUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.Image = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageLogo = reader.result as string;
      };
    }
  }
  get fc(){
    return this.CourseForm.controls;
  }
  getdropdown(){
    this._EducationLevelService.GetEducationLevel().subscribe((res) => {
      this.educationlevels = res.data;
    });
  }
  append(){
    this.CourseFormData = new FormData();
    this.CourseFormData.append("subjectName", this.CourseForm.value.subjectName);    
    this.CourseFormData.append("educationId", this.CourseForm.value.educationId);    
    this.CourseFormData.append("description", this.CourseForm.value.description);    
    this.CourseFormData.append("subjectImage", this.Image);    
   }
  onSubmit(){
    this.button = true;
    if( this.CourseForm.status == "VALID" && this.update == false){
      this.append();
      this._CoursesService.CreateCourse(this.CourseFormData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CourseForm.reset();
       this._Router.navigate(['content/admin/ViewCourses']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.CourseForm.status == "VALID" && this.update == true){
      this.append();
      this._CoursesService.UpdateCourse(this.CourseFormData , this.recordtoupdate.subjectId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CourseForm.reset();
       this._Router.navigate(['content/admin/ViewCourses']);
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
    this._CoursesService.Subject.next(null);
     }
}
