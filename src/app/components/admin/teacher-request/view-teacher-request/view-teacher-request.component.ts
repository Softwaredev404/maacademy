import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeacherRequestService } from './../../../../shared/API-Service/services/teacher-request.service';
@Component({
  selector: 'app-view-teacher-request',
  templateUrl: './view-teacher-request.component.html',
  styleUrls: ['./view-teacher-request.component.css']
})
export class ViewTeacherRequestComponent implements OnInit {
teacherRequests:any [];
pdf:boolean = false;
exam:boolean = false;
title='pagination';
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor(private _TeacherRequestService:TeacherRequestService ) { }

  ngOnInit(): void {
    this.getPdfteachersRequests();
  }

  getPdfteachersRequests(){
    this._TeacherRequestService.GetPdfRequests().subscribe((res) => {
      this.teacherRequests = [];
     this.teacherRequests = res.data;
     this.exam = false;
     this.pdf = true;
    });
 }
  getExamteachersRequests(){
    this._TeacherRequestService.GetExamsRequests().subscribe((res) => {
      this.teacherRequests = [];
     this.teacherRequests = res.data;
    this.pdf = false;
     this.exam = true;
    });
 }
 onTableDataChange(event:any){
  this.page = event;
  this.getPdfteachersRequests();
    }

    denyRequest(id : number){
      Swal.fire({
        title: 'هل تريد الرفض على الطلب ؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'الغاء',
        confirmButtonText: 'ارفض'
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.pdf){
            this._TeacherRequestService.denyRequest(id).subscribe((res) => {
              Swal.fire({
                icon: "success",
                title: "تم الرفض بنجاح",
                showConfirmButton: false,
                timer: 1500,
              });
           this.getExamteachersRequests();
            },(err) => {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text:err.error.message    
              })
              this.getExamteachersRequests();
            },() => {
              console.log("completed");
            })
          }else if(this.exam){
            this._TeacherRequestService.denyExamRequest(id).subscribe((res) => {
              Swal.fire({
                icon: "success",
                title: "تم الرفض بنجاح",
                showConfirmButton: false,
                timer: 1500,
              });
           this.getExamteachersRequests();
            },(err) => {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text:err.error.message    
              })
              this.getExamteachersRequests();
            },() => {
              console.log("completed");
            })
          }
        }
      })
    }
    acceptRequest(id : number){
      Swal.fire({
        title: 'هل تريد الموافقة على الطلب ؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'الغاء',
        confirmButtonText: 'قبول'
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.pdf){
            this._TeacherRequestService.approveRequest(id).subscribe((res) => {
              Swal.fire({
                icon: "success",
                title: "تم القبول بنجاح",
                showConfirmButton: false,
                timer: 1500,
              });
           this.getPdfteachersRequests();
            },(err) => {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text:err.error.message    
              })
              this.getPdfteachersRequests();
            },() => {
              console.log("completed");
            })
          }else if(this.exam){
            this._TeacherRequestService.approveExamRequest(id).subscribe((res) => {
              Swal.fire({
                icon: "success",
                title: "تم القبول بنجاح",
                showConfirmButton: false,
                timer: 1500,
              });
           this.getExamteachersRequests();
            },(err) => {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text:err.error.message    
              })
              this.getExamteachersRequests();
            },() => {
              console.log("completed");
            })
          }
        }
      })
    }


   
}
