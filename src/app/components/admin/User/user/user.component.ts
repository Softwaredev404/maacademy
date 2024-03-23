import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from './../../../../shared/API-Service/services/register.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userForm:FormGroup;
update:boolean = false;
button:boolean = false;
userId:number;
gender:String [] = [ 'ذكر', 'انثى'];
role:number [] = [0, 1];

  constructor(private _FormBuilder:FormBuilder
             ,private _RegisterService:RegisterService
             ,private _Router:Router) { }

  ngOnInit(): void {
    this._RegisterService.user.subscribe((res) => {
      if( res != null){
      this.initiate(res);
      this.update = true;
      this.userId = res.id;
      }else{
        this.initiate();
      }
    })
    
  }
  initiate(data?:any){
    this.userForm = this._FormBuilder.group({
      name: [data?.name || null, Validators.required],
      password: [data?.password || null, Validators.required],
      phone: [data?.phone || null, [Validators.required, Validators.pattern(`^01[0125]{1}[0-9]{8}`)]],
      email: [data?.email || null, [Validators.required]],
      gender: [data?.gender || null, Validators.required],
      location: [data?.location || null],
      role: [ data?.role || null, Validators.required],
    });
  }
  get fc(){
    return this.userForm.controls;
  }

onUpdate(){
this._RegisterService.UpdateUser(this.userForm.value,this.userId).subscribe((res) => {
      Swal.fire({
       icon: "success",
       title: "تم تسجيل شخص جديد بنجاح",
       showConfirmButton: false,
       timer: 1500,
     }); 
     this.userForm.reset();
     this._Router.navigate(['content/admin/ViewUser']);
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
  onSubmit(){
    this.button = true;
    if( this.userForm.status == "VALID" && this.update == false){
      this._RegisterService.CreateAdmin(this.userForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل شخص جديد بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.userForm.reset();
       this._Router.navigate(['content/admin/ViewUser']);
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
    else 
    {
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
    }
   
  }
}
