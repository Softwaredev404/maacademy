import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedStudentsService } from './../../../../shared/API-Service/services/activated-students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-students-activated',
  templateUrl: './view-students-activated.component.html',
  styleUrls: ['./view-students-activated.component.css']
})
export class ViewStudentsActivatedComponent implements OnInit {
ActivatedStudents:any = [];
NumberOfActivateStudents:number;
ToUnActivate:any []=[];
numberofstudents:number;
filterstring:string;
allstudents:boolean = true;
beforeSubjectContentId:number;
  constructor(private _ActivatedRoute:ActivatedRoute
            ,private _ActivatedStudentsService:ActivatedStudentsService
            ,private _Router:Router) { }

  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.beforeSubjectContentId = params['id'];
      this._ActivatedStudentsService.GetActivatedStudents(params['id']).subscribe((res) => {
        this.NumberOfActivateStudents = res.students_count;
        this.ActivatedStudents = res.data;
      })
    });
  }

  selectstudent(id:number){
    if(this.ToUnActivate.includes(id)){
     this.ToUnActivate = this.ToUnActivate.filter(number => number !== id);
    }else{
      this.ToUnActivate.push(id);
    }
   this.numberofstudents = this.ToUnActivate.length;
  }
   selectallstudents(){
      this.ActivatedStudents.forEach(element => {
          this.ToUnActivate.push(element.studentId);
      });
      this.ToUnActivate = [...new Set(this.ToUnActivate)];
      this.numberofstudents = this.ToUnActivate.length;
    this.allstudents = false;
   }
  onSubmit(){
    Swal.fire({
      title: 'هل انت متأكد من الغاء تفعيل الطلاب ؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم الغي التفعيل',
      cancelButtonText: 'رجوع'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ActivatedStudentsService.deleteActivatedStudents(this.beforeSubjectContentId, { studentIds : this.ToUnActivate}).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم الغاء تفعيل الطلاب المحددين",
            showConfirmButton: false,
            timer: 1500,
          });
          this._Router.navigate(['content/admin/ViewSubCourseContent']);
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error.message    
          })
        })
    }
  })
  }
}
