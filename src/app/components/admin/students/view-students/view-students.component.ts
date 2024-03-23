import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentsService } from '../../../../shared/API-Service/services/students.service';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { Image } from './../../../../../images/images';
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  students: any[];
  paymentsHistory: any[];
  img: string = Image;
  filterstring: string;
  isBackSlash: any;
  numberofstudents: number;
  title = 'pagination';
  showPopUp: boolean = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  searched: boolean;
  constructor(private _StudentsService: StudentsService
    , private _Router: Router
    , private _CourseContentService: CourseContentService) { }

  ngOnInit(): void {
    this.getstudents(1);
  }

  getstudents(page: number) {
    this._StudentsService.GetStudent(page).subscribe((res) => {
      this.students = res.data.data;
      this.numberofstudents = res.data.total;
      this.searched = false;
    })
  }

  onTableDataChange(event: any) {
    this._StudentsService.GetStudent(event).subscribe((res) => {
      this.page = event;
      this.students = res.data.data;
    })
  }

  showimage(data) {
    Swal.fire({
      imageUrl: `${this.img}${data}`,
      imageHeight: 300,
      imageAlt: 'A tall image'
    })
  }
  delete(id: number) {
    Swal.fire({
      title: 'هل تريد مسح الطالب ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._StudentsService.DeleteStudent(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getstudents(this.page);
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error.message
          })
          this.getstudents(this.page);
        }, () => {
          console.log("completed");
        })
      }
    })
  }
  update(record: object) {
    this._StudentsService.Student.next(record);
    this._Router.navigate(['content/admin/InsertStudents']);
  }


  async updateactivate(id: number) {
    await Swal.fire({
      title: 'تعديل او مسح المواد المفعلة لهذا الطالب',
      input: 'select',
      inputOptions: {
        'خيارات خاصة بمواد الطالب': {
          update: 'تعديل تفعيل الطالب',
          delete: 'مسح تفعيل الطالب',
        },
      },
      inputPlaceholder: 'اختر تعديل او مسح لتنفيذ العملية',
      showCancelButton: true,
      confirmButtonText: 'استمر',
      cancelButtonText: 'الغاء',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'update') {
            this._StudentsService.updatestudentcontent.next(id);
            this._Router.navigate(['content/admin/InsertActivation']);
            document.getElementsByClassName('swal2-container')[0].remove();
          } else if (value === 'delete') {
            this._StudentsService.deletestudentsubjectcontent(id).subscribe((res) => {
              Swal.fire({
                icon: "success",
                title: "تم مسح محتوى المواد المفعلة لهذا الطالب",
                showConfirmButton: false,
                timer: 1500,
              });
            }, (err) => {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: err.error.message
              })
            })
          }
        })
      }
    })
  }
  addcontent(data: object) {
    this._CourseContentService.studentemail.next(data);
    this._Router.navigate(['content/admin/InsertActivation']);
  }
  removethemobile(id: number) {
    Swal.fire({
      title: 'هل انت متأكد من مسح هذا الهاتف ؟',
      text: "لن يكون لك صلاحية لاعادتة الا عن طريق الطالب نفسة",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم امسح الهاتف المفعل',
      cancelButtonText: 'الغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this._StudentsService.removethemobile({ "studentId": id }).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم مسح الهاتف المفعل على هذا الحساب",
            showConfirmButton: false,
            timer: 1500,
          });
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error.message
          })
        })
      }

    })
  }
  removeAllIps() {
    Swal.fire({
      title: 'هل انت متأكد من مسح كل هواتف ؟',
      text: "لن يكون لك صلاحية لاعادتة الا عن طريق الطالب نفسة",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم امسح الهواتف المفعلة',
      cancelButtonText: 'الغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this._StudentsService.removeallmobile().subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم مسح الهواتف المفعل على كل الطلاب",
            showConfirmButton: false,
            timer: 1500,
          });
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error.message
          })
        })
      }

    })
  }
  viewPaymentHistory(id: number) {
    this._StudentsService.getPaymentHistory(id).subscribe((res) => {
      this.paymentsHistory = res.data;
      if (this.paymentsHistory.length > 0) {
        this.showPopUp = true;
      }
      else {
        Swal.fire({
          title: 'sorry',
          text: "no data",
          icon: 'warning',
          showCancelButton: false,
        });
      }
    })
  }
  close() {
    this.paymentsHistory = [];
    this.showPopUp = false;
  }
  student_reporting(id: number) {
    this._Router.navigate([`content/admin/ViewReports/:id`], { queryParams: { id: id } })
  }
  
  searchInStudents(searchQuery: string) {
    if (searchQuery.length > 3) {
      this._StudentsService.searchInStudent({ "search": searchQuery }).subscribe((res) => {
        if(res.data){
          this.students = res.data;
          this.searched = true;  
        }
        else{
          Swal.fire({
            icon: "error",
            title: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getstudents(this.page);
        }
      })
      this.searched = false;
    }
    else if (searchQuery.length == 3 && this.isBackSlash || searchQuery.length < 3 && this.isBackSlash && this.searched) {
      this.getstudents(this.page);
    }
    this.isBackSlash = false;
  }
  dectectBackSlash(event: KeyboardEvent) {
    var delKey = event.key;

    this.isBackSlash = delKey === "Delete" || delKey === "Backspace";
  }
}

