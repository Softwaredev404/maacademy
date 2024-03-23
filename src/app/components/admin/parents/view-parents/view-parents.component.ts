import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ParentsService } from './../../../../shared/API-Service/services/parents.service';

@Component({
  selector: 'app-view-parents',
  templateUrl: './view-parents.component.html',
  styleUrls: ['./view-parents.component.css']
})
export class ViewParentsComponent implements OnInit {
  parents:any [];
  filterstring:string;
  title='pagination';
  page: number = 1;
    count :number = 0 ;
    tableSize: number = 20;
  constructor(private _ParentsService:ParentsService
            ,private _Router:Router) { }

  ngOnInit(): void {
    this.getparents();
  }

getparents(){
  this._ParentsService.GetParents().subscribe((res) => {
    this.parents = res;
  })
}
onTableDataChange(event:any){
  this.page = event;
  this.getparents();
    }
delete(id : number){
  Swal.fire({
    title: 'هل تريد مسح ولي الامر ؟',
    text: "لن يكون لك صلاحية إعادته مره اخرى",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'الغاء',
    confirmButtonText: 'امسح العنصر !'
  }).then((result) => {
    if (result.isConfirmed) {
      this._ParentsService.DeleteParents(id).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم المسح بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
     this.getparents();
      },(err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text:err.error.message    
        })
        this.getparents();
      },() => {
        console.log("completed");
      })
    }
  }) 
}

update(record:object){
  this._ParentsService.updateparent.next(record);
  this._Router.navigate(['content/admin/InsertParent']);
}
}
