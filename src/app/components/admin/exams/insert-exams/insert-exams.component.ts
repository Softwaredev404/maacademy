import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExamsService } from './../../../../shared/API-Service/services/exams.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-insert-exams',
  templateUrl: './insert-exams.component.html',
  styleUrls: ['./insert-exams.component.css']
})
export class InsertExamsComponent implements OnInit {
  ExamForm: FormGroup;
  ExamFormTimer: FormGroup;
  button: boolean = false;
  coursecontentId: number;
  writeorwrong: boolean;
  update: boolean = false;
  exam_id: number;
  timerinput: number;
  btnstop: boolean = false;
  htmlContent: string;
  questionDropDown: Object[] = [
    { text: 'firstChoice', type: 'الاختيار الاول' },
    { text: 'secondChoice', type: 'الاختيار الثاني' },
    { text: 'thirdChoice', type: 'الاختيار الثالث' },
    { text: 'fourChoice', type: 'الاختيار الرابع' },];
  question1: boolean = false;
  question2: boolean = false;
  question3: boolean = false;
  question4: boolean = false;
  question5: boolean = false;
  Exams: any[] = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '',
    minHeight: '10rem',
    maxHeight: 'auto',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'اكتب نص السؤال.....',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'textColor', 'backgroundColor'],
      ['insertImage', 'insertVideo', 'link', 'indent', 'unlink',]
    ]
  };
  constructor(private _ExamsService: ExamsService
    , private _Router: Router
    , private _FormBuilder: FormBuilder
    , private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._ExamsService.data.subscribe((res) => {
      if (res != null) {
        this.Exams = res.examBody;
        this.update = true;
        this.exam_id = res.exam_id;
        this.coursecontentId = res.subjectContentId;
        this.timerinput = res.timer;
      } else {
        this._ActivatedRoute.params.subscribe(params => {
          this.coursecontentId = params['id'];
        });
      }
    });

  }
  onInputChange(value: string) {
    const parsedValue = +value; // Convert the input value to a number
    if (parsedValue >= 1 && parsedValue <= 180) {
      this.timerinput = parsedValue;
      this.btnstop = false;
    } else {
      this.btnstop = true;
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'لا يمكن ان يكون وقت الامتحان اقل من دقيقة ولا اكثر من 180 دقيقة',
      });
    }
  }
  initiate(id?: number) {
    switch (id != null) {
      case id == 1:
        this.ExamForm = this._FormBuilder.group({
          id: [this.Exams.length + 1],
          typeid: [1, Validators.required],
          question: ['', Validators.required],
          questionImage: ['', Validators.required],
          fitanswer: ['', Validators.required],
        });
        break;
      case id == 2:
        this.ExamForm = this._FormBuilder.group({
          id: [this.Exams.length + 1],
          typeid: [2, Validators.required],
          question: ['', Validators.required],
          questionImage: [''],
          firstChoice: ['', Validators.required],
          firstChoiceImage: [''],
          secondChoice: ['', Validators.required],
          secondChoiceImage: [''],
          thirdChoice: ['', Validators.required],
          thirdChoiceImage: [''],
          fourChoice: [''],
          fourChoiceImage: [''],
          correctChoice: [null],
          selectedChoice: [''],
          commentAnswer: [false],
          commentText: ['']
        });
        break;
      case id == 3:
        this.ExamForm = this._FormBuilder.group({
          id: [this.Exams.length + 1],
          typeid: [3, Validators.required],
          question: ['', Validators.required],
          questionImage: ['', Validators.required],
          correctChoice: [null, Validators.required],
          selectedChoice: ['']
        });
        break;
      case id == 4:
        this.ExamForm = this._FormBuilder.group({
          id: [this.Exams.length + 1],
          typeid: [4, Validators.required],
          question: ['', Validators.required],
          questionImage: ['', Validators.required]
        });
        break;
      default:
        alert('no question');
        break;
    }
  }

  get fc() {
    return this.ExamForm.controls;
  }
  newquestion(id: number) {
    switch (id != null) {
      case id == 1:
        this.initiate(1);
        this.question1 = true;
        this.scrollToBottom();
        break;
      case id == 2:
        this.initiate(2);
        this.question2 = true;
        this.scrollToBottom();
        break;
      case id == 3:
        this.initiate(3);
        this.question3 = true;
        this.scrollToBottom();
        break;
      case id == 4:
        this.initiate(4);
        this.question4 = true;
        this.scrollToBottom();
        break;
      default:
        alert('ververbre');
        break;
    }
  }
  delete(id: number) {
    Swal.fire({
      title: 'هل تريد مسح السؤال ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح السؤال !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Exams.splice(this.Exams.findIndex(r => r.id == id), 1);
        Swal.fire({
          icon: "success",
          title: "تم المسح بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }
  Update(data: any) {
    switch (data.typeid) {
      case 1:
        break;
      case 2:
        this.ExamForm = this._FormBuilder.group({
          id: [data.id],
          typeid: [2, Validators.required],
          qusetion: [data.qusetion, Validators.required],
          firstChoice: [data.firstChoice, Validators.required],
          secondChoice: [data.secondChoice, Validators.required],
          thirdChoice: [data.thirdChoice, Validators.required],
          fourChoice: [data.fourChoice, Validators.required],
          correctChoice: [data.correctChoice, Validators.required],
          selectedChoice: [data.selectedChoice]
        });
        this.question2 = true;
        break;
      case 3:
        this.ExamForm = this._FormBuilder.group({
          id: [data.id],
          typeid: [3, Validators.required],
          qusetion: [data.qusetion, Validators.required],
          correctChoice: [data.correctChoice, Validators.required],
          selectedChoice: [data.selectedChoice]
        });
        this.question3 = true;
        break;
      case 4:
        this.ExamForm = this._FormBuilder.group({
          id: [data.id],
          typeid: [4, Validators.required],
          qusetion: [data.qusetion, Validators.required],
        });
        this.question4 = true;
        break;
      default:
        alert('no record to update');
        break;
    }
    this.Exams.splice(this.Exams.findIndex(r => r.id == this.ExamForm.value.id), 1);
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  onSubmit() {
    this.Exams.push(this.ExamForm.value);
    this.ExamForm.reset();
    this.button = true;
    this.question1 = false;
    this.question2 = false;
    this.question3 = false;
    this.question4 = false;
  }

  async Exam() {
    await Swal.fire({
      title: 'قم بأحتيار نوع السؤال المراد اضافته في الامتحان',
      input: 'select',
      inputOptions: {
        'SelectQuestion': 'اضافة سؤال اختيار من متعدد',
        'TrueFalse': 'اضافة سؤال صح و خطأ',
        'video': 'اضافة سؤال فيديو',
      },
      inputPlaceholder: 'اختر نوع السؤال',
      showCancelButton: true,
      confirmButtonText: 'استمر',
      cancelButtonText: 'الغاء',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          switch (value) {
            case 'SelectQuestion':
              this.newquestion(2);
              document.getElementsByClassName('swal2-container')[0].remove();
              break;
            case 'TrueFalse':
              this.newquestion(3);
              document.getElementsByClassName('swal2-container')[0].remove();
              break;
            case 'video':
              this.newquestion(4);
              document.getElementsByClassName('swal2-container')[0].remove();
              break;
            default:
              alert('this is default');
              break;
          }
        })
      }
    })
  }
  examSubmit() {
    if (this.update == false) {
      this._ExamsService.CreateExam({ subjectContentId: this.coursecontentId, examBody: this.Exams, timer: this.timerinput }).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تسجيل الامتحان بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.button = false;
        this.Exams = [];
        this._Router.navigate(['/content/admin/ViewCourseLecture']);
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
      })
    } else if (this.update == true) {
      this._ExamsService.UpdateExam({ subjectContentId: this.coursecontentId, examBody: this.Exams, timer: this.timerinput }, this.exam_id).subscribe((res) => {
        Swal.fire({
          icon: "success",
          title: "تم تعديل الامتحان بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        this.button = false;
        this.Exams = [];
        this._Router.navigate(['/content/admin/ViewCourseLecture']);
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تأكد من ملئ جميع الخانات',
        });
      })
    }

  }
  ngOnDestroy() {
    this._ExamsService.data.next(null);
  }

}
