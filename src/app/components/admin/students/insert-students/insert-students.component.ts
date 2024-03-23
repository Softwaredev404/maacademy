import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentsService } from './../../../../shared/API-Service/services/students.service';
import { EducationLevelService } from './../../../../shared/API-Service/services/education-level.service';
import { Image } from './../../../../../images/images';
@Component({
  selector: 'app-insert-students',
  templateUrl: './insert-students.component.html',
  styleUrls: ['./insert-students.component.css']
})
export class InsertStudentsComponent implements OnInit {
StudentForm:FormGroup;
StudentFormdata:FormData;
Image:File;
imageLogo:string;
recordtoupdate:any;
update:boolean = false;
button:boolean = false;
educationlevels:any;
ImageURL:string = Image;
gender:String []= [ 'ذكر', 'انثى'];
is_test:number [] = [0, 1];
  constructor(private _FormBuilder:FormBuilder
             ,private _StudentsService:StudentsService
             ,private _Router:Router
             ,private _EducationLevelService:EducationLevelService) { }

  ngOnInit(): void {
    this.geteducationlevel();
    this._StudentsService.Student.subscribe((res) => {
      if(res == null){
        this.initiate();
      }else{
        this.update = true;
        this.recordtoupdate = res;
        this.imageLogo = this.ImageURL + this.recordtoupdate.StudentImage;
        this.checkupdate(this.recordtoupdate);
      }
    })
  }


  initiate(){
    this.StudentForm = this._FormBuilder.group({
      studentName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(`^01[0125]{1}[0-9]{8}`)]],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`)]],
      educationId: ['', Validators.required],
      is_test: [ '' || null, Validators.required],
    });
  }

  checkupdate(data:any){
    this.StudentForm = this._FormBuilder.group({
      studentName: [data.studentName, Validators.required],
      phone: [data.phone, [Validators.required, Validators.pattern(`^1[0125]{1}[0-9]{8}`)]],
      gender: [data.gender, Validators.required],
      location: [data.location, Validators.required],
      password: [data.showPassword, [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`)]],
      email: [data.email, Validators.required],
      educationId: [data.educationId, Validators.required],
      is_test: [ data.is_test, Validators.required],
    });
    
  }
  
  geteducationlevel(){
   this._EducationLevelService.GetEducationLevel().subscribe((res) => {
    this.educationlevels = res.data;
   }) 
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
        // this.logoForm?.append("image", this.Image);
      };
    }
  }
  get fc(){
    return this.StudentForm.controls;
  }
  onSubmit(){
    this.button = true;
    if( this.StudentForm.status == "VALID" && this.update == false){
      this._StudentsService.CreateStudent(this.StudentForm.value).subscribe((res) => {
      //   Swal.fire({
      //    icon: "success",
      //    title: "تم تسجيل الكورس بنجاح",
      //    showConfirmButton: false,
      //    timer: 1500,
      //  }); 
      Swal.fire({
        icon: "success",
        title: `: تم تسجيل الطالب بنجاح , الرقم التسلسلي للطالب " ${res[0].code} " `,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
       this.StudentForm.reset();
       this._Router.navigate(['content/admin/ViewStudents']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.StudentForm.status == "VALID" && this.update == true){
      this._StudentsService.UpdateStudent(this.StudentForm.value, this.recordtoupdate.studentId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل الطالب بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.StudentForm.reset();
       this._Router.navigate(['content/admin/ViewStudents']);
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
    this._StudentsService.Student.next(null);
     }
}
