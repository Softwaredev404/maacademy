import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { QroffersService } from './../../../../shared/API-Service/services/qroffers.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit {
Offers:any [];
SubjectOffers:any [];
  constructor( private _FormBuilder:FormBuilder
             , private sanitizer: DomSanitizer
             , private _QroffersService :QroffersService
             , private _Router:Router ) { }

  ngOnInit(): void {
    this.getoffers();
  }

 getoffers(){
  this._QroffersService.GetQR().subscribe((res) => {
    this.Offers = res.data;
  });
  this._QroffersService.GetLessonQR().subscribe((res) => {
    this.SubjectOffers = res.data;
  })
 }
 update(data:object){
  this._QroffersService.Data.next(data);
  this._Router.navigate(['content/admin/InsertOffer']);
}
 delete(id : number){
  Swal.fire({
    title: 'هل تريد مسح العرض ؟',
    text: "لن يكون لك صلاحية إعادته مره اخرى",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'الغاء',
    confirmButtonText: 'امسح العنصر !'
  }).then((result) => {
    if (result.isConfirmed) {
      this._QroffersService.DeleteQR(id).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم المسح بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
     this.getoffers();
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text:err.error.message    
        })
        this.getoffers();
      },() => {
        console.log("completed");
      })
    }
  }) 
}
deleteLesson(id :number){
  Swal.fire({
    title: 'هل تريد مسح العرض ؟',
    text: "لن يكون لك صلاحية إعادته مره اخرى",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'الغاء',
    confirmButtonText: 'امسح العنصر !'
  }).then((result) => {
    if (result.isConfirmed) {
      this._QroffersService.DeleteSubjectQR(id).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم المسح بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
     this.getoffers();
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text:err.error.message    
        })
        this.getoffers();
      },() => {
        console.log("completed");
      })
    }
  }) 
}
updateLesson(data:object){
  this._QroffersService.Data.next(data);
  this._QroffersService.Lesson.next(true);
  this._Router.navigate(['content/admin/InsertOffer']);
}


}
