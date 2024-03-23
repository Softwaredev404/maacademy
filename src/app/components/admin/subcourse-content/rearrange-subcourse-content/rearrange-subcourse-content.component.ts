import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
import { SubcourseService} from './../../../../shared/API-Service/services/subcourse.service';
@Component({
  selector: 'app-rearrange-subcourse-content',
  templateUrl: './rearrange-subcourse-content.component.html',
  styleUrls: ['./rearrange-subcourse-content.component.css']
})
export class RearrangeSubcourseContentComponent implements OnInit {
records:any [];
arrangedrecords:number []=[];
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
  constructor(private _SubcoursecontentService:SubcoursecontentService
              ,private _SubcourseService:SubcourseService
             ,private _Router:Router) { }

  ngOnInit(): void {

    this._SubcoursecontentService.RearrangeSubjectContent.subscribe((res) => {
      if(res != null) {
        this.Toast.fire({
          icon: 'warning',
          title: 'قم بسحب اي من عناصر الجدول للموقع المراد'
        })
        this.getfiltersubcoursecontent(res);
      }else{
        this._Router.navigate(['content/admin/ViewSubCourseContent']); 
      }
    })
   
  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
    console.log(this.records);
    // this.gettheprimarykeysoftherecords();
  }

 getfiltersubcoursecontent(id:number){
this._SubcoursecontentService.filtersubjectcontent(id).subscribe((res) => {
  this.records = res.data;
   })
   
}


gettheprimarykeysoftherecords(){
  this.records.forEach(element => {
    this.arrangedrecords.push(element.subjectContentId);
  });
}
onSubmit(){
  this.gettheprimarykeysoftherecords();
  this._SubcourseService.rearrange(this.arrangedrecords).subscribe((res) => {
    Swal.fire({
      icon: "success",
      title: "تم الترتيب بنجاح",
      showConfirmButton: false,
      timer: 1500,
    }); 
  })
}
ngOnDestroy(){
  this._SubcoursecontentService.RearrangeSubjectContent.next(null);
}
}
