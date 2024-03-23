import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-insert-pdf',
  templateUrl: './insert-pdf.component.html',
  styleUrls: ['./insert-pdf.component.css']
})
export class InsertPdfComponent implements OnInit {
coursecontentpdf:FormGroup;
coursecontentpdfFormData:FormData;
Pdf:File;
Logopdf:string; 
button:boolean = false;
update:boolean = false;
recordtoupdate:any;
visilblity:object [] = [{ id: 1 , title: "يسمح للطالب بالتحميل"}, { id: 0 ,title:"لا يسمح للطالب بالتحميل"}];
  constructor(private _CourseContentService:CourseContentService
             ,private _FormBuilder:FormBuilder
             ,private _Router:Router) { }

  ngOnInit(): void {
 this._CourseContentService.insertpdfId.subscribe((res) => {
  if( res != null){
    this.initiate(res);
  }else{
    this._CourseContentService.updatepdfId.subscribe((ress) => {
      if( ress != null){
        this.update = true;
    this.updatePdf(ress);
    this.recordtoupdate = ress;
      }else{
        this._Router.navigate(['content/admin/InsertCourseLecture']);
      }
    })
  }
 })

  }


  initiate(id:number){
    this.coursecontentpdf = this._FormBuilder.group({
      subjectContentId: [id, Validators.required],
      pdf: ['', Validators.required],
      namePdf: ['', Validators.required],
      flag: ['', Validators.required],
    });
  }
  updatePdf(data:any){
    this.coursecontentpdf = this._FormBuilder.group({
      subjectContentId: [data.id, Validators.required],
      pdf: [data.pdfs, Validators.required],
      namePdf: [data.namePdf, Validators.required],
    });
  }
   // pdfFile
   getLogoUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.Pdf = event.target.files[0];
      reader.readAsDataURL(file);
      // reader.onload = () => {
      //   // this.Logopdf = reader.result as string;
      // };
      this.Logopdf = './../../../../../assets/images/pdflogo.jpg';
    }
    
  }
get fc(){
  return this.coursecontentpdf.controls;
}
  appenddata(){
    this.coursecontentpdfFormData = new FormData();
    this.coursecontentpdfFormData.append("subjectContentId", this.coursecontentpdf.value.subjectContentId);    
    this.coursecontentpdfFormData.append("namePdf", this.coursecontentpdf.value.namePdf);    
    this.coursecontentpdfFormData.append("flag", this.coursecontentpdf.value.flag);    
    this.coursecontentpdfFormData.append("pdf", this.Pdf);    
  }

  onSubmit(){
    this.button = true;
    if( this.coursecontentpdf.status == "VALID" && this.update == false){
      this.appenddata();
      this._CourseContentService.insertPdf(this.coursecontentpdfFormData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل محتوى المادة بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.coursecontentpdf.reset();
       this._Router.navigate(['content/admin/ViewCourseLecture']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.coursecontentpdf.status == "VALID" && this.update == true){
      this.appenddata();
      this._CourseContentService.updatePdf(this.recordtoupdate.id ,this.coursecontentpdfFormData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل محتوى المادة بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.coursecontentpdf.reset();
       this._Router.navigate(['content/admin/ViewCourseLecture']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else{
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
    }
   
  }

  ngOnDestory(){
    this._CourseContentService.insertpdfId.next(null);
    this._CourseContentService.updatepdfId.next(null);
  }
}
