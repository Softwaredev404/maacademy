import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { TeachersService } from './../../../../shared/API-Service/services/teachers.service';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';
import { EducationLevelService } from './../../../../shared/API-Service/services/education-level.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Image } from './../../../../../images/images';

@Component({
  selector: 'app-insert-teachers',
  templateUrl: './insert-teachers.component.html',
  styleUrls: ['./insert-teachers.component.css']
})
export class InsertTeachersComponent implements OnInit {
update:boolean = false;
button:boolean = false;
educationlevels:any[];
subjects:any[];
selectedid:number [] = [];
recordtoupdate:any;
dropdownSettings = {
  singleSelection: false,
  idField: 'educationId',
  textField: 'nameAr',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
};
selectedItems:any [] = [];
data:any [];
  TeacherForm:FormGroup;
  TeacherFormData:FormData;
  imageLogo:string;
  Image:File;
  ImageURL:string = Image;
  genders:object [] = [
    { id: 1 , name:'ذكر'},
    { id: 2 , name: 'انثى'}
  ]
  constructor(private _FormBuilder:FormBuilder
             ,private _TeachersService:TeachersService
             ,private _Router:Router
             ,private _EducationLevelService:EducationLevelService
             ,private _CoursesService:CoursesService) { }

  ngOnInit(): void {
    this.getdropdowns();
    this._TeachersService.Teacher.subscribe((res) => {
      if( res == null){
        this.initiate();
      }else{
        this.update = true;
        this.recordtoupdate = res;
        this.checkupdate(this.recordtoupdate);
        this.imageLogo = "https://www.maapp.misrpedia.com/public/" + this.recordtoupdate.teacherImage;
        debugger 
      }
    })
  }

  getdropdowns(){
  this._EducationLevelService.GetEducationLevel().subscribe((res) => {
    this.educationlevels = res.data;
  })
  this._CoursesService.GetCourse().subscribe((res) => {
    this.subjects = res.data;
  })
  }
  initiate(){
    this.TeacherForm = this._FormBuilder.group({
      teacherName: ['', Validators.required],
      educationIds: ['', Validators.required],
      subjectId: ['', Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`)]]
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
  appendedForm(){
    this.TeacherFormData = new FormData();
    this.TeacherFormData.append('teacherName', this.TeacherForm.value.teacherName);
    this.TeacherFormData.append('educationIds[]', this.TeacherForm.value.educationIds);
    this.TeacherFormData.append('subjectId', this.TeacherForm.value.subjectId);
    this.TeacherFormData.append('location', this.TeacherForm.value.location);
    this.TeacherFormData.append('gender', this.TeacherForm.value.gender);
    this.TeacherFormData.append('email', this.TeacherForm.value.email);
    this.TeacherFormData.append('password', this.TeacherForm.value.password);
    this.TeacherFormData.append('teacherImage', this.Image);
  }
  checkupdate(data:any){   
   this.selectedItems = data.educationIds;
  this.TeacherForm = this._FormBuilder.group({
      teacherName: [data.teacherName, Validators.required],
      educationIds: [this.selectedItems, Validators.required],
      subjectId: [data.subjectId, Validators.required],
      location: [data.location, Validators.required],
      gender: [data.gender, Validators.required],
      email: [data.email, Validators.required],
      password: [data.password, [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`)]]
    });
  }

  insertarray(data:any){
    data.forEach(element => 
      this.selectedid.push(element.educationId)
    );
    this.TeacherForm.value.educationIds = this.selectedid
  } 
  get fc() {
    return this.TeacherForm.controls;
  }

  onSubmit(){
    this.button = true;
    if( this.TeacherForm.status == "VALID" && this.update == false){
      this.insertarray(this.selectedItems);
      this.appendedForm();
      this._TeachersService.CreateTeacher(this.TeacherFormData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل المدرس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.TeacherForm.reset();
       this._Router.navigate(['content/admin/ViewTeachers']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.TeacherForm.status == "VALID" && this.update == true){
      this.insertarray(this.selectedItems);
      this.appendedForm();
      this._TeachersService.UpdateTeacher(this.TeacherFormData, this.recordtoupdate.teacherId).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.TeacherForm.reset();
       this._Router.navigate(['content/admin/ViewTeachers']);
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
    this._TeachersService.Teacher.next(null);
    this.selectedItems = [];
     }
}
