import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { SubcourseService } from '../../../../shared/API-Service/services/subcourse.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rearrange-subcourse',
  templateUrl: './rearrange-subcourse.component.html',
  styleUrls: ['./rearrange-subcourse.component.css']
})
export class RearrangeSubcourseComponent implements OnInit {
records:any [];
arrangedrecords:number [] = [];
Toast = Swal.mixin({
  toast: true,
  position: 'top',
  background:'#fff',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  customClass:{
  }
})
  constructor(private _SubcourseService:SubcourseService
             ,private _Router:Router
             ,private _ActivatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
this.Toast.fire({
  icon: 'warning',
  title: 'قم بسحب اي من عناصر الجدول للموقع المراد'
})
this._ActivatedRoute.queryParams.subscribe(params => {
  this.getsubcourse(params['id']);
});
   
  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
  }
  
  getsubcourse(id:number){
   this._SubcourseService.filterSubCourse(id).subscribe((res) => {
    this.records = res.data;
   })
  }

  gettheprimarykeysoftherecords(){
    this.records.forEach(element => {
      this.arrangedrecords.push(element.beforSubjectContentId);
    });
  }
  onSubmit(){
    this.gettheprimarykeysoftherecords();
    this._SubcourseService.rearrangebeforesubcourse(this.arrangedrecords).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "تم الترتيب بنجاح",
        showConfirmButton: false,
        timer: 1500,
      }); 
    },(err) => {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.error.message
      }); 
    })
  }
}
