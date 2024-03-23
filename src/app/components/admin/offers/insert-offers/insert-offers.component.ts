import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Swal from 'sweetalert2';
import { SubcourseService } from './../../../../shared/API-Service/services/subcourse.service';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
import { TeachersService } from './../../../../shared/API-Service/services/teachers.service';
import { QroffersService } from './../../../../shared/API-Service/services/qroffers.service'
import { triggerHandler } from 'devextreme/events';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
@Component({
  selector: 'app-insert-offers',
  templateUrl: './insert-offers.component.html',
  styleUrls: ['./insert-offers.component.css']
})
export class InsertOffersComponent implements OnInit {
  @ViewChildren('myDivs', { read: ElementRef }) myDivs: QueryList<ElementRef>;
OfferFrom:FormGroup;
OfferFromData:FormData;
case : number = 1;
update:boolean = false;
button:boolean = false;
courses:any [];
QrCode:string [];
teachers:any;
NumberOfStudents:number;
dropdownSettings:any = {};
dropdownSettingscourse:any = {};
subcoursecontent:any [];
subcourse:any [];
myDivTags:any [];
selectedsubcoursecontent:any [];  
selectedsubcourse:any [];
title:string = 'app';
OfferId:number;
elementType:string = NgxQrcodeElementTypes.URL;
correctionLevel  = NgxQrcodeErrorCorrectionLevels.HIGH;
qrbutton:boolean = true;
printqrbutton:boolean = true;
oneoffour:any []= [{name:'teacher', state:true} , {name:'subcoursecontent',state:true}, {name:'subcourse',state:true}];
  constructor( private _Router:Router 
             , private _FormBuilder:FormBuilder
             , private _SubcourseService:SubcourseService 
             , private _SubcoursecontentService:SubcoursecontentService
             , private _TeachersService:TeachersService
             , private _QroffersService:QroffersService
             , private _CourseContentService:CourseContentService) { }

  async ngOnInit(): Promise<void> {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'beforSubjectContentId',
      textField: 'beforSubjectContentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    this.dropdownSettingscourse = {
      singleSelection: false,
      idField: 'subjectContentId',
      textField: 'subjectContentName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    
  this.getdropdowns();
  this._QroffersService.Data.subscribe((res) => {
    if( res != null){

      this.initiate(res);
      this.OfferId = res.offersId;
       this.update = true;
       this.QrCode = res.QR;
       this.NumberOfStudents = this.QrCode.length;
      this._QroffersService.Lesson.subscribe((responce) => {
        if(responce){
                 this.case = 2;
                 this.selectedsubcourse = res.beforSubjectContentId;
        }else{
          this.selectedsubcoursecontent = res.beforSubjectContentId
        }  
      })
      
  //  this.filterObjectsById(this.subcoursecontent, res.beforSubjectContentId);
    }  else{
      this.initiate();
  }
})
}



  initiate(data?:any){
    this.OfferFrom = this._FormBuilder.group({
      subjectContentId: [''],
      date_start: [data?.date_start || '', Validators.required],
      date_end: [data?.date_end || '', Validators.required],
      status: [true],
      name: [data?.name || '', Validators.required],
      QRSubjectContent: [this.QrCode],
    });
  }
  
  selectpackage(id:any){
     switch(id){
    case 1 :
      this.case =1 ;
      break;
    case 2 :
      this.case = 2;
      break;
      default :
      alert('welhvwe');
      break;
     }
  }
  filterObjectsById(objects: any[], ids: number[]) {  
   this.selectedsubcoursecontent = objects.filter(obj => ids.includes(obj.beforSubjectContentId));
  }


  // getId(data : object){
  // for(let i = 0 ; i <= this.oneoffour.length; i++){
  //  if( this.oneoffour[i] == data){
   
  //  }else{
  //   this.oneoffour[i].state = false;
  //  } 
  // }
  // }
  get fc(){
    return this.OfferFrom.controls;
  }
  getQRCodes(){
    this.QrCode = [];
    if(this.case == 1){
      for(var i = 0 ; i < this.NumberOfStudents; i++){
        this.QrCode.push("Chapter" + Math.random().toString(36).substring(2, 15));
       }
    }else if(this.case == 2){
      for(var i = 0 ; i < this.NumberOfStudents; i++){
        this.QrCode.push("Lec" + Math.random().toString(36).substring(2, 15));
       }
    }
    this.printqrbutton = false;
  }
  
  removeAndAdd(arr1, arr2) {
    arr2 = [];
    // Remove first 2 elements from arr1
    arr1.splice(0, 4);
    // Add only 4 numbers to arr2
    for (let i = 0; i < arr2.length; i++) {
      arr2.push(arr1[i]);
    }
  }
  printQRCode(): void {
  //  let lines = Math.ceil(this.NumberOfStudents / 4);
let printWindow = window.open(` `, '_blank','width=800,height=600,top=50,left=50,toolbar=no,location=no,resizable=yes');
printWindow.document.write('<html><head><title>' + 'MA-Academy'  + '</title>');
printWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">');
printWindow.document.write('</head><body>');
printWindow.document.write('<h1>' + 'كل ماسح  ضوئي صالح للاستخدام مره واحدة فقط'  + '</h1>');
printWindow.document.write('<div class="row">');
printWindow.document.write(document.getElementById('printDiv').innerHTML);
printWindow.document.write('</div>');
printWindow.document.write('</body>');
printWindow.document.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>');
printWindow.document.write('</html>');
    printWindow.print();  
    printWindow.close();
  }
  
  checknumberofstudents(){
    if( this.NumberOfStudents != null){
   this.qrbutton = false;
    }else{
      this.qrbutton = true;
    }
  }
  getdropdowns(){
  this._CourseContentService.GetCourseContent().subscribe((res) => {
    this.subcourse = res.data;
  });
   this._SubcoursecontentService.GetSubjectContent().subscribe((res) => {
    this.subcoursecontent = res.data;
   });
   this._TeachersService.GetTeacher().subscribe((res) => {
    this.teachers = res.data;
   });
  }
  
  appendData(){
   this.OfferFromData = new FormData();
  //  this.OfferFromData.append("subSubjectId", this.OfferFrom.value.subSubjectId);    
   this.selectedsubcoursecontent.forEach(element => {
    this.OfferFromData.append("beforSubjectContentId[]", element.beforSubjectContentId);        
   });
   this.OfferFromData.append("date_start", this.OfferFrom.value.date_start);    
   this.OfferFromData.append("date_end", this.OfferFrom.value.date_end);    
   this.OfferFromData.append("status", this.OfferFrom.value.status); 
   this.OfferFromData.append("name", this.OfferFrom.value.name); 
   this.QrCode.forEach(element => {
    this.OfferFromData.append("QR[]", element);    
   });   
  }
  appendLessonData(){
   this.OfferFromData = new FormData();
   if(this.update == false){
    this.selectedsubcourse.forEach(element => {
      this.OfferFromData.append("subjectContentId[]", element.subjectContentId);        
     });
   }else{
    this.selectedsubcourse.forEach(element => {
      this.OfferFromData.append("subjectContentId[]", element);        
     });
   }
   this.OfferFromData.append("date_start", this.OfferFrom.value.date_start);    
   this.OfferFromData.append("date_end", this.OfferFrom.value.date_end);    
   this.OfferFromData.append("status", this.OfferFrom.value.status); 
   this.OfferFromData.append("name", this.OfferFrom.value.name); 
   this.QrCode.forEach(element => {
    this.OfferFromData.append("QRSubjectContent[]", element);    
   });   
  }

  isFirstDateBeforeSecondDate(date1: Date, date2: Date): boolean {
    return this.OfferFrom.value.date_start < this.OfferFrom.value.date_end;
  }
  onSubmit(){
    if(this.isFirstDateBeforeSecondDate(this.OfferFrom.value.date_start , this.OfferFrom.value.date_end)){
      this.SendData();
    } else if(this.OfferFrom.get('name').value === ''){
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ان تاريخ بدء العرض يكون قبل تاريخ انتهاء العرض',
      });
    }
  }
  SendData(){
    this.button = true;
    if( this.OfferFrom.status == "VALID" && this.update == false && this.case == 1){
      this.appendData();
      this._QroffersService.CreateQR(this.OfferFromData).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تسجيل العرض بنجاح",
          showConfirmButton: false,
          timer: 1500,
        }); 
        this._Router.navigate(['content/admin/ViewOffer']);
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
        this.button = false;
      })
    }else if( this.OfferFrom.status == "VALID" && this.update == false && this.case == 2){
      this.appendLessonData();
      this._QroffersService.CreateSubjectQR(this.OfferFromData).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تسجيل العرض بنجاح",
          showConfirmButton: false,
          timer: 1500,
        }); 
        this._Router.navigate(['content/admin/ViewOffer']);
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
        this.button = false;
      })
    }
    else if(this.OfferFrom.status == "VALID" && this.update == true && this.case == 1){
      this.appendData();
      this._QroffersService.UpdateQR(this.OfferFromData, this.OfferId).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تعديل العرض بنجاح",
          showConfirmButton: false,
          timer: 1500,
        }); 
        this._Router.navigate(['content/admin/ViewOffer']);
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
        this.button = false;
      })
    }
    else if(this.OfferFrom.status == "VALID" && this.update == true && this.case == 2){
      this.appendLessonData();
      this._QroffersService.UpdateSubjectQR(this.OfferFromData, this.OfferId).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تعديل العرض بنجاح",
          showConfirmButton: false,
          timer: 1500,
        }); 
        this._Router.navigate(['content/admin/ViewOffer']);
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
        this.button = false;
      })
    }
  }

  ngOnDestroy(){
    this._QroffersService.Data.next(null);
    this._QroffersService.Lesson.next(null);
  }
}
