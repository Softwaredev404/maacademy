import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { SubcoursecontentService } from './../../../../shared/API-Service/services/subcoursecontent.service';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';
@Component({
  selector: 'app-view-course-content',
  templateUrl: './view-course-content.component.html',
  styleUrls: ['./view-course-content.component.css']
})
export class ViewCourseContentComponent implements OnInit {
  courselectures: any[];
  filteredcourselectures: any[];
  SubjectsName: any[];
  filterstring: string;
  notFiltered: boolean = false;
  filteredisok: boolean = false;
  isBackSlash: any;
  searched: boolean = false;
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  constructor(private _CourseContentService: CourseContentService
    , private _Router: Router
    , private _CourseService: CoursesService
    , private _ActivatedRoute: ActivatedRoute
    , private _SubcoursecontentService: SubcoursecontentService) { }

  ngOnInit(): void {
    this.getcoursecontent(1);
    // this._ActivatedRoute.queryParams.subscribe(params => {
    //   if (params['id'] == null) {
    //     this.notFiltered = true;
    //     this._CourseService.GetCourse().subscribe(res => {
    //       this.SubjectsName = res.data;
    //       this.filteredisok = true;
    //     });
    //     this.getcoursecontent(1);
    //   } else {
    //     this._SubcoursecontentService.filtersubjectcontent(params['id']).subscribe((res) => {
    //       this.courselectures = res.data;
    //       this.filteredisok = false;
    //     })
    //   }
    // });
  }

  showCourse(subjectContentId: any, subjectContentFlag: any) {
    let notSubjectContentFlag = subjectContentFlag == 0 ? 1 : 0;
    this._CourseService.toggleCourse(subjectContentId, notSubjectContentFlag).subscribe((res) => {
      this.getcoursecontent(1);
      Swal.fire({
        icon: "success",
        title: subjectContentFlag == 1 ? "تم اخفاء المحتوى بنجاح" : "تم اظهار المحتوى بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  getcoursecontent(page: number) {
    this._CourseContentService.GetCourseContentPage(page).subscribe((res) => {
      this.courselectures = res.data.data;
      this.count = res.data.total;
      this.searched = false;
      // this.filteredcourselectures = res.data;
    })
  }


  addExam(id: number) {
    this._Router.navigate([`content/admin/ViewExams/${id}`], { queryParams: { id: id } });
  }


  onTableDataChange(event: any) {
    this.page = event;
    this._CourseContentService.GetCourseContentPage(event).subscribe((res) => {
      this.courselectures = res.data.data;
    })
  }

  // filter(subjectId: any) {
  //   this.filteredcourselectures = this.courselectures.filter(r => r.subjectId == subjectId);
  // }

  delete(id: number) {
    Swal.fire({
      title: 'هل تريد مسح المحتوى ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CourseContentService.DeleteCourseContent(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getcoursecontent(1);
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error.message
          })
          this.getcoursecontent(1);
        }, () => {
          console.log("completed");
        })
      }
    })
  }

  update(record: object) {
    this._CourseContentService.coursecontent.next(record);
    this._Router.navigate(['content/admin/InsertCourseLecture']);
  }

  insertpdf(id: number) {
    this._CourseContentService.insertpdfId.next(id);
    this._Router.navigate(['content/admin/ViewCoursesPdf']);
  }

  RemoveZoom(id: number) {
    Swal.fire({
      title: 'هل تريد وقف الحلقة ؟',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'اوقف البث !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CourseContentService.RemoveZoomURL(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getcoursecontent(1);
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

  searchInCourse(searchQuery: string) {
    if (searchQuery.length > 3) {
      this._SubcoursecontentService.searchInCourses({ "search": searchQuery }).subscribe((res) => {
        if (res.data) {
          this.courselectures = res.data;
          this.searched = true;
        }
        else {
          Swal.fire({
            icon: "error",
            title: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getcoursecontent(this.page);
        }
      })
      this.searched = false;
    }
    else if (searchQuery.length == 3 && this.isBackSlash || searchQuery.length < 3 && this.isBackSlash && this.searched) {
      this.getcoursecontent(this.page);
    }
    this.isBackSlash = false;
  }
  dectectBackSlash(event: KeyboardEvent) {
    var delKey = event.key;

    this.isBackSlash = delKey === "Delete" || delKey === "Backspace";

  }
}
