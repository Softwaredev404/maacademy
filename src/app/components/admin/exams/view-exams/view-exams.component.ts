import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamsService } from './../../../../shared/API-Service/services/exams.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit {
  coursecontentId:number;
  exams:any;
  constructor( private _ExamsService:ExamsService
             , private _ActivatedRoute:ActivatedRoute
             , private _Router:Router
             , private _DatePipe:DatePipe) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.coursecontentId = params['id'];
      this.getExams(params['id'])
    })
  }

  getExams(id : number){
  this._ExamsService.GetExam(id).subscribe((res) => {
    this.exams = res.data;
    this.exams.forEach(element => {
      element.created_at = this._DatePipe.transform(element.created_at, 'yyyy-MM-dd');
    });
  })
   }

  GoToExam(){
    this._Router.navigate([`content/admin/InsertExams/${this.coursecontentId}`], { queryParams: { id: this.coursecontentId } });
  }

  delete(id : number){
    Swal.fire({
      title: 'هل تريد مسح الامتحان ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ExamsService.DeleteExam(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getExams(this.coursecontentId);
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getExams(this.coursecontentId);
        },() => {
          console.log("completed");
        })
      }
    }) 
  }

  Update(data:any){
  this._ExamsService.data.next(data);
  this._Router.navigate([`content/admin/InsertExams/${this.coursecontentId}`], { queryParams: { id: this.coursecontentId } });
  }
}
