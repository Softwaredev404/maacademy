import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostsService } from './../../../../shared/API-Service/services/posts.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {
posts :any;
value :number [] = [];
records:any [];
hasnochanges:number [] = [];
haschanges : boolean = false;
arrangedrecords:number [] = [];
page: number = 1;
  count :number = 0 ;
  tableSize: number = 20;
  constructor( private _PostsService:PostsService
             , private _Router:Router) { }

  ngOnInit(): void {
    this.getPosts();
  }
  drop(event: CdkDragDrop<string[]>){
    this.haschanges = true;

    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
    this.gettheprimarykeysoftherecords();
    
    debugger;
    if(this.arraysAreEqualUsingJSON(this.hasnochanges, this.arrangedrecords)){
      this.haschanges = false;
    }
  }
   arraysAreEqualUsingJSON(arr1, arr2) {
    const json1 = JSON.stringify(arr1);
    const json2 = JSON.stringify(arr2);
  
    return json1 === json2;
  }
  
  gettheprimarykeysoftherecords(){
    this.arrangedrecords = [];
    this.records.forEach(element => {
      this.arrangedrecords.push(element.availableOffersId);
    });
  }
  onSubmit(){

    this._PostsService.rearrangebeforposts(this.arrangedrecords).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "تم الترتيب بنجاح",
        showConfirmButton: false,
        timer: 1500,
      }); 
      this.posts();
      this.records = [];
      this.haschanges = false;
    },(err) => {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: err.error.message
      }); 
    })
  }

  getPosts(){
  this._PostsService.Get().subscribe((res) => {
    this.records = res.data;
    this.records.forEach(element => {
      this.hasnochanges.push(element.availableOffersId);
    });
  })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getPosts();
      }
  update(record:object){
    this._PostsService.Data.next(record);
    this._Router.navigate(['content/admin/InsertPosts']);
  }
  delete(id:number){
    Swal.fire({
      title: 'هل تريد مسح المنشور ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._PostsService.Delete(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getPosts();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getPosts();

        },() => {
          console.log("completed");
        })
      }
    }) 
  }
}
