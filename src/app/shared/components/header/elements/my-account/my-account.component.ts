
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  EmployeeName: string = "";
  companyId: string;
  role: string;
  public isSuperAdmin : string = localStorage.getItem('isSuperAdmin');

  constructor(private _Router: Router, ) {}

  ngOnInit() { 
   this.role = this.isSuperAdmin == 'true'? 'Super Admin' : 'Admin';
  }
  logout() {
    const role = + localStorage.getItem("Authorization");
    console.log(role);
    // window.location.reload(); 
    debugger
    localStorage.clear();
    this._Router.navigate([""]);

  }
  Profile() {
    this.companyId = localStorage.getItem("");

    // this._CompanyService.Data.next(this.companyId);
  }
}
