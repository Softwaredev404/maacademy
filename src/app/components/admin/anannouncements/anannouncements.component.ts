import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/API-Service/services/register.service';
import { Anannouncements } from '../../../shared/Models/anannouncements';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-anannouncements',
  templateUrl: './anannouncements.component.html',
  styleUrls: ['./anannouncements.component.css']
})
export class AnannouncementsComponent implements OnInit {
  anannouncementsList: Anannouncements;
  userForm:FormGroup;
  popFrom: string = "<form class='needs-validation' autocomplete='off'[formGroup] ='userForm'(ngSubmit)='onSubmit()'><div class='form-row'><div class='col-6 mb-3'><label for='validation01'><span class='validation-required'>*</span> اسم المستخدم</label> <input class='form-control' id='validation01' type='text' formControlName='name'placeholder='نص الاخطار'containerClass='' /></div></div></form>";
  constructor(private _RegisterService:RegisterService) { }

  ngOnInit(): void {
    this.getAnannouncements();
  }
  getAnannouncements(){
    this._RegisterService.Anannouncements().subscribe((res) => {
      this.anannouncementsList = res.data;
    })
  }
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
  async openAddAnnouncmentPopUp(){
    
    await  Swal.fire({
       title: 'اكتب محتوي الاخطار',
       input: 'text',
       inputPlaceholder: 'الاخطار',
       showCancelButton: true,
       confirmButtonText: 'ارسل',
       cancelButtonText:'الغاء',
       inputValidator: (value) => {
         return new Promise((resolve) => {
          let data = {
            text:value
          }
             this._RegisterService.createAnnounce(data).subscribe((res) =>{
               Swal.fire({
                 icon: "success",
                 title: "تم اخطار جميع المستخدمين",
                 showConfirmButton: false,
                 timer: 1500,
               });
               this.getAnannouncements()
             },(err) => {
               Swal.fire({
                 icon: 'error',
                 title: 'خطأ',
                 text:err.error.message    
               })
             })
         })
       }
   })
 }
  delete(id : number){
     Swal.fire({
       title: 'هل تريد مسح الاخطار ؟',
       text: "لن يكون لك صلاحية إعادته مره اخرى",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'الغاء',
       confirmButtonText: 'امسح العنصر !'
     }).then((result) => {
       if (result.isConfirmed) {
         this._RegisterService.deleteAnnounce(id).subscribe((res) => {
           Swal.fire({
           icon: "success",
           title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
           });
        this.getAnannouncements();
        },(err) => {
          Swal.fire({
            icon: 'error',
           title: 'خطأ',
            text:err.error.message    
          })
          this.getAnannouncements();
        },() => {
          console.log("completed");
         })
       }
     }) 

  }


}
