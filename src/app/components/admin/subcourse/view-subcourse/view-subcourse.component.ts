import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SubcourseService } from "../../../../shared/API-Service/services/subcourse.service";
import { CourseContentService } from "../../../../shared/API-Service/services/course-content.service";

@Component({
  selector: "app-view-subcourse",
  templateUrl: "./view-subcourse.component.html",
  styleUrls: ["./view-subcourse.component.css"],
})
export class ViewSubcourseComponent implements OnInit {
  subsubjects: any[];
  filterstring: string;
  title = "pagination";
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  constructor(
    private _SubcourseService: SubcourseService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getsubsubjects();
  }

  rearrangesubsubject(id: number) {
    this._Router.navigate([`content/admin/RearrangeSubSubject/${id}`], {
      queryParams: { id: id },
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getsubsubjects();
  }
  getsubsubjects() {
    this._SubcourseService.GetSubCourse().subscribe((res) => {
      this.subsubjects = res.data;
    });
  }
  showSubSubjectContent(subSubjectId: any, subSubjectFlag: any) {
    let notsubSubjectFlag = subSubjectFlag == 0 ? 1 : 0;
    this._SubcourseService
      .showSubSubject(subSubjectId, notsubSubjectFlag)
      .subscribe((res) => {
        this.getsubsubjects();
        Swal.fire({
          icon: "success",
          title:
            subSubjectFlag == 1
              ? "تم اخفاء المحتوى بنجاح"
              : "تم اظهار المحتوى بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
      });
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
        this._SubcourseService.DeleteSubCourse(id).subscribe(
          (res) => {
            Swal.fire({
              icon: "success",
              title: "تم المسح بنجاح",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getsubsubjects();
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "خطأ",
              text: err.error.message,
            });
            this.getsubsubjects();
          },
          () => {
            console.log("completed");
          }
        );
      }
    });
  }
  update(record: object) {
    this._SubcourseService.SubSubject.next(record);
    this._Router.navigate(["content/admin/InsertSubSubject"]);
  }

  insertsubcontent(id) {
    this._SubcourseService.SubSubject.next(id);
    this._Router.navigate(["content/admin/InsertSubCourseContent"]);
  }
}
