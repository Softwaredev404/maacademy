import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ParentsService } from './../../../../shared/API-Service/services/parents.service';
import { StudentsService } from './../../../../shared/API-Service/services/students.service';

@Component({
  selector: 'app-insert-parents',
  templateUrl: './insert-parents.component.html',
  styleUrls: ['./insert-parents.component.css']
})
export class InsertParentsComponent implements OnInit {
  try: string = 'fwewe';
  ParentForm: FormGroup;
  ParentFormData: FormData;
  recordtoupdate: any;
  students: any[];
  update: boolean = false;
  button: boolean = false;
  Image: File;
  imageLogo: string;
  gender: String[] = ['ذكر', 'انثى'];
  selectedItems: any[] = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'studentId',
    textField: 'studentName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
  };
  constructor(private _FormBuilder: FormBuilder
    , private _Router: Router
    , private _ParentsService: ParentsService
    , private _StudentsService: StudentsService) { }

  ngOnInit(): void {
    this.getDropDown();
    this._ParentsService.updateparent.subscribe((res) => {
      if (res != null) {
        this.recordtoupdate = res;
        this.initiate(res);
        this.update = true;
      } else {
        this.initiate();
      }
    })
  }

  initiate(data?: any) {
    this.ParentForm = this._FormBuilder.group({
      fatherName: [data?.fatherName || null, Validators.required],
      gender: [data?.gender || null, Validators.required],
      location: [data?.location || null, Validators.required],
      email: [data?.email || null, [Validators.required, Validators.email]],
      password: [data?.password || null, [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$`)]],
      studentemail: [data?.studentemail || this.selectedItems],
    });
  }
  getDropDown() {
    this._StudentsService.getStudentsEmail().subscribe((res) => {
      this.students = res.data;
      this.students = this.students.map(student => student.email);
    })
  }
  get fc() {
    return this.ParentForm.controls;
  }


  studentEmails(selectedItems: any[]) {
    this.ParentForm.value.studentemail.push(selectedItems);
  }
  onSubmit() {
    this.button = true;
    // this.ParentForm.value.studentemail = this.selectedItems;

    if (this.ParentForm.status == "VALID" && this.update == false) {
      this._ParentsService.CreateParents(this.ParentForm.value).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تسجيل ولي الامر بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.ParentForm.reset();
        this._Router.navigate(['content/admin/ViewParent']);
      }, (err) => {
        this.button = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
        this.button = false;
      })
    } else if (this.ParentForm.status == "VALID" && this.update == true) {
      this._ParentsService.UpdateParents(this.ParentForm.value, this.recordtoupdate.fatherId).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تعديل ولي الامر بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.ParentForm.reset();
        this._Router.navigate(['content/admin/ViewParent']);
      }, (err) => {
        this.button = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
        this.button = false;
      })
    }
    else {
      this.button = false;
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });
      this.button = false;
    }

  }

  ngOnDestroy() {
    this._ParentsService.updateparent.next(null);
  }
}
