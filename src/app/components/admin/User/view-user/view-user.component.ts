import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from './../../../../shared/API-Service/services/register.service';
import { AdminUser } from '../../../../shared/Models/admin-user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
Users: AdminUser;
filterstring:string;

title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 10;
  constructor(private _RegisterService:RegisterService
              ,private _Router:Router) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers(){
    this._RegisterService.GetUsers().subscribe((res) => {
      this.Users = res;
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getusers();
      }
  delete(id : number){
   this._RegisterService.DeleteUser(id).subscribe(res => {
    Swal.fire({
      icon: "success",
      title: "تم مسح المسؤول بنجاح",
      showConfirmButton: false,
      timer: 1500,
    }); 
    this.getusers();
   },(err) => {
    Swal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'تأكد من ملئ جميع الخانات',
    }); 
   })
  }

  update(record:object){
    this._RegisterService.user.next(record);
    this._Router.navigate(['content/admin/InsertUser']);
  }
}
