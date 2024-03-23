import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
ChangepasswordForm:FormGroup;
button:boolean = false;
  constructor(private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initiate();
  }

  initiate(){
    this.ChangepasswordForm = this._FormBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
    });
  }
  get fc(){
    return this.ChangepasswordForm.controls;
  }

  onSubmit(){
    this.button = true;
    if(this.ChangepasswordForm.status == "Valid"){
      Swal.fire({
        icon: "success",
        title: "تم تعديل كلمة السر بنجاح",
        showConfirmButton: false,
        timer: 1500,
      }); 
    }else{
      this.button = false;
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });  
    }
  }
}
