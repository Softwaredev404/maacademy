import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SubcoursecontentService } from "./../../../../shared/API-Service/services/subcoursecontent.service";
import { CourseContentService } from "./../../../../shared/API-Service/services/course-content.service";
@Component({
  selector: "app-view-subcoursecontent",
  templateUrl: "./view-subcoursecontent.component.html",
  styleUrls: ["./view-subcoursecontent.component.css"],
})
export class ViewSubcoursecontentComponent implements OnInit {
  subsubjects: any[];
  filterstring: string;
  title = "pagination";
  isBackSlash: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  searched: boolean = false;
  constructor(
    private _SubcoursecontentService: SubcoursecontentService,
    private _Router: Router,
    private _CourseContentService: CourseContentService
  ) { }

  ngOnInit(): void {
    this.getsubcontent(1);
  }

  getsubcontent(page: number) {
    this._SubcoursecontentService.GetSubjectContent(page).subscribe((res) => {
      this.subsubjects = res.data.data;
      this.count = res.data.total
      this.searched = false;
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this._SubcoursecontentService.GetSubjectContent(event).subscribe((res) => {
      this.subsubjects = res.data.data;
    })
  }

  rearrangesubsubjectcontent(id: number) {
    this._SubcoursecontentService.RearrangeSubjectContent.next(id);
    this._Router.navigate(["content/admin/Rearangesubcoursecontent"]);
  }
  showBeforSubjectContent(beforSubjectContentId: any, beforeFlag: any) {
    let notbeforeFlag = beforeFlag == 0 ? 1 : 0;
    this._SubcoursecontentService.showSubjectContent(beforSubjectContentId, notbeforeFlag).subscribe((res) => {
      this.getsubcontent(this.page);
      Swal.fire({
        icon: "success",
        title: beforeFlag == 1 ? "تم اخفاء المحتوى بنجاح" : "تم اظهار المحتوى بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
  addcontent(data: any) {
    this._CourseContentService.insertnewcoursecontent.next(data);
    this._Router.navigate(["content/admin/InsertCourseLecture"]);
  }

  delete(id: number) {
    Swal.fire({
      title: "هل تريد مسح الكورس ؟",
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "الغاء",
      confirmButtonText: "امسح العنصر !",
    }).then((result) => {
      if (result.isConfirmed) {
        this._SubcoursecontentService.DeleteSubjectContent(id).subscribe(
          (res) => {
            Swal.fire({
              icon: "success",
              title: "تم المسح بنجاح",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getsubcontent(this.page);
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "خطأ",
              text: err.error.message,
            });
            this.getsubcontent(this.page);
          },
          () => {
            console.log("completed");
          }
        );
      }
    });
  }
  update(record: object) {
    this._SubcoursecontentService.SubjectContent.next(record);
    this._Router.navigate(["content/admin/InsertSubCourseContent"]);
  }

  GettheStudentsInTheSubSubjectContent(beforSubjectContentId: number) {
    this._Router.navigate(["content/admin/ViewActivatedStudents/${id}"], {
      queryParams: { id: beforSubjectContentId },
    });
  }
  getallthecourses(id: number) {
    this._Router.navigate(["content/admin/ViewCourseLecture/${id}"], {
      queryParams: { id: id },
    });
  }
  searchInStudents(searchQuery: string) {
    if (searchQuery.length > 3) {
      this._SubcoursecontentService.searchInSubCourses({ "search": searchQuery }).subscribe((res) => {
        if(res.data){
          this.subsubjects = res.data;
          this.searched = true;
        }
        else{
          Swal.fire({
            icon: "error",
            title: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getsubcontent(this.page);
        }
      })
      this.searched = false;
    }
    else if (searchQuery.length == 3 && this.isBackSlash || searchQuery.length < 3 && this.isBackSlash && this.searched) {
      this.getsubcontent(this.page);
    }
    this.isBackSlash = false;
  }
  dectectBackSlash(event: KeyboardEvent) {
    var delKey = event.key;

    this.isBackSlash = delKey === "Delete" || delKey === "Backspace";
  }
}
