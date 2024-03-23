import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TeachersService } from '../../../../shared/API-Service/services/teachers.service';
import { CoursesService } from '../../../../shared/API-Service/services/courses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { SubcourseService } from './../../../../shared/API-Service/services/subcourse.service';
import { Image } from './../../../../../images/images';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-insert-course-content',
  templateUrl: './insert-course-content.component.html',
  styleUrls: ['./insert-course-content.component.css']
})

export class InsertCourseContentComponent implements OnInit {
  @ViewChild('qrcodeElement') qrcodeElement: ElementRef;
  selectedItems: any[] = [];
  courses: any[];
  teachers: any[];
  subSubjects: any[];
  beforSubjectContent: any[];
  CourseLectureForm: FormGroup;
  CourseLectureFormData: FormData
  Image: File;
  imageLogo: string = null;
  img: string = Image;
  fileLogo: string;
  update: boolean = false;
  button: boolean = false;
  recordtoupdate: any;
  subSubjectid: number;
  QrCode: string;
  zoom: string = ' ';
  title: string = 'app';
  elementType: string = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  setDate = new Date();
  minDate: string;
  selectedid: number[] = [];
  checkInitiateData: boolean = false;
  dropdownSettings = {
    singleSelection: false,
    idField: 'teacherId',
    textField: 'teacherName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
  };
  constructor(private _CoursesService: CoursesService
    , private _CourseContentService: CourseContentService
    , private _TeachersService: TeachersService
    , private _FormBuilder: FormBuilder
    , private _Router: Router
    , private _SubcourseService: SubcourseService) {
    this.minDate = new Date().toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.getdropdowns();

    this.minDate = new Date().toISOString().split("T")[0];

    this._CourseContentService.insertnewcoursecontent.subscribe((data) => {
      if (data == null) {
        this._CourseContentService.coursecontent.subscribe((res) => {
          if (res == null) {
            this.initiate();
          } else {
            this.recordtoupdate = res;
            this.checkedit(this.recordtoupdate);
          }
        })
      } else {
        this.checkInitiateData = true;
        this.getSubSubject(data.subjectId);
        this.getBeforeSubjectContent(data.subSubjectId);
        this.initiate(data);
      }
    })

  }

  ngAfterViewInit() {
    // const canvasElement: HTMLCanvasElement = this.qrcodeElement.nativeElement.querySelector('canvas');
    // const imageDataUrl: string = canvasElement.toDataURL();
  }

  getSubSubject(subjectId: number) {
    if (this.checkInitiateData == false) {
      this.CourseLectureForm.get('subSubjectId').setValue(null);
      this.CourseLectureForm.get('beforSubjectContentId').setValue(null);
    }
    this.beforSubjectContent = null;
    this._SubcourseService.filterSubject(subjectId).subscribe((res) => {
      this.subSubjects = res.data;
      this.checkInitiateData = false;
    });
  }

  getBeforeSubjectContent(subSubjectId: number) {
    if (this.checkInitiateData == false) {
      this.CourseLectureForm.get('beforSubjectContentId').setValue(null);
    }
    this._SubcourseService.filterSubCourse(subSubjectId).subscribe((res) => {
      this.beforSubjectContent = res.data;
      this.checkInitiateData = false;
    })
  }

  getdropdowns() {
    this._CoursesService.GetCourse().subscribe((res) => {
      this.courses = res.data;
    });
    this._TeachersService.GetTeacher().subscribe((res) => {
      this.teachers = res.data;
    });
  }

  initiate(data?: any) {
    this.CourseLectureForm = this._FormBuilder.group({
      teacherId: [null, Validators.required],
      subjectId: [data?.subjectId || null, Validators.required],
      subjectContentName: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      videoURL: [null, Validators.required],
      subSubjectId: [data?.subSubjectId || null, Validators.required],
      beforSubjectContentId: [data?.beforSubjectContentId || null, Validators.required],
      setDate: [null]
    });
  }

  checkedit(data: any) {
    this.selectedItems = data.teacherIds;
    this.CourseLectureForm = this._FormBuilder.group({
      subjectContentName: [data.subjectContentName, Validators.required],
      price: [data.price, Validators.required],
      subjectContentImage: [data.subjectContentimage, Validators.required],
      subSubjectId: [data.SubSubjectId, Validators.required],
      videoURL: [data.video_url, Validators.required],
      teacherId: [this.selectedItems, Validators.required],
      description: [data.description, Validators.required],
      subjectId: [data.subjectId, Validators.required],
      beforSubjectContentId: [data.beforSubjectContentId, Validators.required],
      setDate: [data.valid_date]
    });

    this.imageLogo = this.img + data.subjectContentimage;
    this.update = true;
  }


  get fc() {
    return this.CourseLectureForm.controls;
  }

  appenddata() {
    this.CourseLectureFormData = new FormData();

    // to append all selectedItems
    this.selectedItems.forEach(element => {
      this.CourseLectureFormData.append("teacherIds[]", element.teacherId);
    });
    this.CourseLectureFormData.append("beforSubjectContentId", this.CourseLectureForm.value.beforSubjectContentId);
    this.CourseLectureFormData.append("subSubjectId", this.CourseLectureForm.value.subSubjectId);
    this.CourseLectureFormData.append("subjectId", this.CourseLectureForm.value.subjectId);
    this.CourseLectureFormData.append("subjectContentName", this.CourseLectureForm.value.subjectContentName);
    this.CourseLectureFormData.append("price", this.CourseLectureForm.value.price);
    this.CourseLectureFormData.append("video_url", this.CourseLectureForm.value.videoURL);
    this.CourseLectureFormData.append("description", this.CourseLectureForm.value.description);
    this.CourseLectureFormData.append("subjectContentImage", this.Image);
    this.CourseLectureFormData.append("zoom", this.zoom);
    if (this.CourseLectureForm.value.setDate != '') {
      var formateddate = formatDate(this.CourseLectureForm.value.setDate, 'Y-M-d', 'en-US');
      this.CourseLectureFormData.append("valid_date", formateddate);
    }
  }

  Addzoom() {
    this.appenddata();
    this._CourseContentService.UpdateCourseContent(this.CourseLectureFormData, 2).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: "تم تسجيل محتوى المادة بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
      this.CourseLectureForm.reset();
      this._Router.navigate(['content/admin/ViewCourseLecture']);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });
    })
  }
  // imgFile
  getLogoUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.Image = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageLogo = reader.result as string;
      };
    }
  }


  public downloadQRCode() {
    // const fileNameToDownload = 'image_qrcode';
    // const base64Img = document.getElementsByClassName('aclass')[0].children[0]['src'];
  }

  onSubmit() {
    this.button = true;
    if (this.CourseLectureForm.status == "VALID" && this.update == false) {
      this.appenddata();

      this._CourseContentService.CreateCourseContent(this.CourseLectureFormData).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تسجيل محتوى المادة بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.CourseLectureForm.reset();
        this._Router.navigate(['content/admin/ViewCourseLecture']);
      }, (err) => {
        this.button = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
        this.button = false;
      })
    } else if (this.CourseLectureForm.status == "VALID" && this.update == true) {
      this.appenddata();
      this._CourseContentService.UpdateCourseContent(this.CourseLectureFormData, this.recordtoupdate.subjectContentId).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تعديل الكورس بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.CourseLectureForm.reset();
        this._Router.navigate(['content/admin/ViewCourseLecture']);
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
    this._CourseContentService.coursecontent.next(null);
    this._CourseContentService.insertnewcoursecontent.next(null);
  }
}
