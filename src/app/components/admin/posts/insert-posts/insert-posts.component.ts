import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostsService } from '../../../../shared/API-Service/services/posts.service';
import { CourseContentService } from '../../../../shared/API-Service/services/course-content.service';
import { Image } from './../../../../../images/images';


@Component({
  selector: 'app-insert-posts',
  templateUrl: './insert-posts.component.html',
  styleUrls: ['./insert-posts.component.css']
})
export class InsertPostsComponent implements OnInit {
  PostForm: FormGroup;
  PostFormData: FormData;
  imageLogo: string;
  Image: File;
  img: string = Image;
  coursecontent: any;
  button: boolean = false;
  update: boolean = false;
  recordtoupdate: any;
  constructor(private _PostsService: PostsService, private _Router: Router, private _FormBuilder: FormBuilder, private _CourseContentService: CourseContentService) { }

  ngOnInit(): void {

    this._PostsService.Data.subscribe((res) => {
      this.getdropdown();
      if (res != null) {
        this.update = true;
        this.recordtoupdate = res;
        this.imageLogo = 'https://www.maapp.misrpedia.com/public/' + res.availbleOfferImage;
        this.initiate(res);
      } else {
        this.initiate();
      }
    })
  }

  initiate(data?: any) {
    this.PostForm = this._FormBuilder.group({
      subjectContentId: [data?.subjectContentId || null],
      description: [data?.description || null, Validators.required],
      availableOfferName: [data?.availableOfferName || null, Validators.required],
      availableOfferVideo: [data?.availableOfferVideo || null],
    });
  }
  getdropdown() {
    this._CourseContentService.GetCourseContent().subscribe((res) => {
      this.coursecontent = res.data;
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
  get fc() {
    return this.PostForm.controls;
  }
  appendPostData() {
    this.PostFormData = new FormData();
    this.PostForm.value.subjectContentId && this.PostFormData.append("subjectContentId", this.PostForm.value.subjectContentId);
    this.PostForm.value.description && this.PostFormData.append("description", this.PostForm.value.description);
    this.PostForm.value.availableOfferName && this.PostFormData.append("availableOfferName", this.PostForm.value.availableOfferName);
    this.PostForm.value.availableOfferVideo && this.PostFormData.append("availableOfferVideo", this.PostForm.value.availableOfferVideo);
    this.Image && this.PostFormData.append("image", this.Image);
  }

  onSubmit() {
    // this.button = true;

    if (this.PostForm.status == "VALID" && this.update == false) {
      if (this.Image || this.PostForm.value.availableOfferVideo) {
        if (this.Image && this.PostForm.value.availableOfferVideo) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'يجب ادخال صورة او فيديو',
          });
        }
        else {
          this.appendPostData();
          this._PostsService.Create(this.PostFormData).subscribe((res) => {
            Swal.fire({
              icon: "success",
              title: "تم تسجيل المنشور بنجاح",
              showConfirmButton: false,
              timer: 1500,
            });
            this.PostForm.reset();
            this._Router.navigate(['content/admin/ViewPosts']);
          }, (err) => {
            console.log(err);
            // this.button = false;
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'حدث خطأ',
            });
            // this.button = false;
          })
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'يجب ادخال صورة او فيديو',
        });
      }
    } else if (this.PostForm.status == "VALID" && this.update == true) {
      this.appendPostData();
      this._PostsService.Update(this.PostFormData, this.recordtoupdate.availableOffersId).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تعديل المنشور بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.PostForm.reset();
        this._Router.navigate(['content/admin/ViewPosts']);
      }, (err) => {
        // this.button = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ',
        });
        // this.button = false;
      })
    }
    else {
      // this.button = false;
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });
      // this.button = false;
    }
  }


  ngOnDestroy() {
    this._PostsService.Data.next(null);
  }
}
