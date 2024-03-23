import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeachersService } from './../../../../shared/API-Service/services/teachers.service';

@Component({
  selector: 'app-view-teachers-students',
  templateUrl: './view-teachers-students.component.html',
  styleUrls: ['./view-teachers-students.component.css']
})
export class ViewTeachersStudentsComponent implements OnInit {
  teachers_students:any;
  teachersId:number;
title='pagination';
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor( private _TeachersService:TeachersService
             , private _Router:Router
             , private _ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this._ActivatedRoute.params.subscribe((params) => {
    this.teachersId = params['teacherId'];
    this.getstudentteachers(params['teacherId'])
   })
  }

getstudentteachers(id:number){
   this._TeachersService.GetStudentForTeacher(id).subscribe((res) => {
    this.teachers_students = res.data;
   })
}
onTableDataChange(event:any){
  this.page = event;
  this.getstudentteachers(this.teachersId);
    }
}
