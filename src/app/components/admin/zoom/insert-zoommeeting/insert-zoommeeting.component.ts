import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoomMtg } from '@zoomus/websdk';
@Component({
  selector: 'app-insert-zoommeeting',
  templateUrl: './insert-zoommeeting.component.html',
  styleUrls: ['./insert-zoommeeting.component.css']
})
export class InsertZoommeetingComponent implements OnInit {
  ZoomForm:FormGroup;
    signature:any;
    passWord:string = 'saif1997117';
    sdkKey : '';
    sdkSecret : '';
    
    role:string = '0';
    leaveUrl : 'http://localhost:4200'
   
  constructor(public httpClient: HttpClient,private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initiate();
  }


  initiate(){
    this.ZoomForm = this._FormBuilder.group({
      meetingNumber: ['74511275395', Validators.required],
      userName: ['Seif', Validators.required],
      userEmail: ['saiftarekfagal@gmail.com', Validators.required],
      apiKey: ['29RlZP-ZT2OZkHERJhY46A', Validators.required],
      apiSecret: ['JlRlxsKXQBy0uaKphF9IuA', Validators.required],
    });
  }
  get fc(){
    return this.ZoomForm.controls;
  }
  onSubmit(){
    // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
    // ZoomMtg.preLoadWasm();
    // ZoomMtg.prepareWebSDK();
   
    // ZoomMtg.init({
    //   leaveUrl: 'https://your-app.com',
    //   isSupportAV: true,
    //   success: () => {
    //     ZoomMtg.join({
    //       meetingNumber: this.ZoomForm.value.meetingNumber,
    //       userName: this.ZoomForm.value.userName,
    //       userEmail: this.ZoomForm.value.userEmail,
    //       signature: this.signature,
    //       success: (res) => {
    //         console.log('join meeting success' ,res);
    //       },
    //       error: (res) => {
    //         console.log(res);
    //       }
    //     });
    //   },
    //   error: (res) => {
    //     console.log(res);
    //   }
    // });
  }

 
 
}
