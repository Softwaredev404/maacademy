import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeachersService} from './../../../../shared/API-Service/services/teachers.service';
@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit {
teachers:any = [];
title='pagination';
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor(private _TeachersService:TeachersService , private _Router:Router) { }

  ngOnInit(): void {
    this.getteachers();
  }

getteachers(){
   this._TeachersService.GetTeacher().subscribe((res) => {
    this.teachers = res.data;
    
   })
}
teacherRelated(id:number, teacherName:string){
  this._Router.navigate(['content/admin/ViewTeacherCourses', id , teacherName]); 
}
GetTeachersStudents(id:number){
  this._Router.navigate([`content/admin/ViewTeacherStudents/${id}`]); 
}
onTableDataChange(event:any){
  this.page = event;
  this.getteachers();
    }
  delete(id : number){
    Swal.fire({
      title: 'هل تريد مسح المدرس ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._TeachersService.DeleteTeacher(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getteachers();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getteachers();
      //     Swal.fire({
      //       icon: "success",
      //       title: "تم المسح بنجاح",
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //  this.getteachers();
        },() => {
          console.log("completed");
        })
      }
    })
  }
  update(record:object){
    this._TeachersService.Teacher.next(record);
    this._Router.navigate(['content/admin/InsertTeachers']);
  }
}
