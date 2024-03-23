import { Component, OnInit } from '@angular/core';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Server_URL } from 'src/environments/environment';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {
pdfs:any;
subjectcontentid:number;
baseURL:string = Server_URL.slice(0, -3);
visilblity:object [] = [{ id: 1 , title: "يسمح للطالب بالتحميل"}, { id: 0 ,title:"لا يسمح للطالب بالتحميل"}];

  constructor(private _CourseContentService:CourseContentService
             ,private _Router:Router ) { }

  ngOnInit(): void {
    this._CourseContentService.insertpdfId.subscribe((res) => {
      if( res != null){
        this.subjectcontentid = res;
        this.getpdfs(res);
      }else {
        this._Router.navigate(['content/admin/ViewCoursesPdf']);
      }
    })
    
  }

  getpdfs(id:number){
    this._CourseContentService.ListPdf(id).subscribe((res) => {
      this.pdfs = res.data;
      
    })
  }
 
  delete(id:number){
    Swal.fire({
      title: 'هل تريد مسح الكورس ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CourseContentService.deletepdf(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getpdfs(this.subjectcontentid);
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getpdfs(this.subjectcontentid);
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
 async update(data:any){
    if(data.flag == 0){
      Swal.fire({
        title: 'هل تريد السماح بتحميل هذا الملف ؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'الغاء',
        confirmButtonText: 'اسمح بالتحميل !'
      }).then((result) => {
        if (result.isConfirmed) {
         this._CourseContentService.updateFlagPdf(data.id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم السماح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getpdfs(this.subjectcontentid);
         },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getpdfs(this.subjectcontentid);
         })
        } 
      }) 
    }else{
      Swal.fire({
        title: 'هل تريد منع تحميل هذا الملف ؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'الغاء',
        confirmButtonText: 'امنع التحميل !'
      }).then((result) => {
        if (result.isConfirmed) {
          this._CourseContentService.updateFlagPdf(data.id).subscribe((res) => {
            Swal.fire({
              icon: "success",
              title: "تم منع التحميل بنجاح",
              showConfirmButton: false,
              timer: 1500,
            });
         this.getpdfs(this.subjectcontentid);
          },(err) => {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text:err.error.message    
            })
            this.getpdfs(this.subjectcontentid);
           })
          
        }
      }) 
    }
 }


}
