import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from './../../../../shared/API-Service/services/teachers.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-teachercourses',
  templateUrl: './view-teachercourses.component.html',
  styleUrls: ['./view-teachercourses.component.css']
})
export class ViewTeachercoursesComponent implements OnInit {
TeacherName:string;
TeacherId:number;
courselectures:any;
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor(private _Router:Router
             ,private route:ActivatedRoute
             ,private _TeachersService:TeachersService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.TeacherId = +params['id'];
      this.TeacherName = params['teacherName'];
    });
   this.getTeacherCourses();
  }
  
  getTeacherCourses(){
    //this to fetch courses related to the teacher
    this._TeachersService.TeacherCourse(this.TeacherId).subscribe((res) => {
      this.courselectures = res.data;
    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text:err.error.message    
      })
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getTeacherCourses();
      }
}
