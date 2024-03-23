import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EducationLevelService } from './../../../../shared/API-Service/services/education-level.service';

@Component({
  selector: 'app-view-educationlevel',
  templateUrl: './view-educationlevel.component.html',
  styleUrls: ['./view-educationlevel.component.css']
})
export class ViewEducationlevelComponent implements OnInit {
educationlevels:any [];
title='pagination';
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor(private _EducationLevelService:EducationLevelService
              ,private _Router:Router) { }

  ngOnInit(): void {
    this.getedicationlevels();
  }

  getedicationlevels(){
    this._EducationLevelService.GetEducationLevel().subscribe((res) => {
      this.educationlevels = res.data;
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getedicationlevels();
      }
  delete(id : number){
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
        this._EducationLevelService.DeleteEducationLevel(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getedicationlevels();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getedicationlevels();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }

  update(record:object){
    this._EducationLevelService.EducationLevel.next(record);
    this._Router.navigate(['content/admin/InsertEducationLevel']);
  }
}
