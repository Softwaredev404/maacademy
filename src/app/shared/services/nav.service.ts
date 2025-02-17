import { stringify } from "@angular/compiler/src/util";
import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;
  public isSuperAdmin : string = localStorage.getItem('isSuperAdmin');
  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // Full screen
  public fullScreen: boolean = false;

  public Role: any = localStorage.getItem("CamlRole");
  public RoleCamlGATE = 1; // private admin only
  public RoleCamlEmployee = 2; // private admin only
  public RoleCompany = 5; // private Company only
  public RoleCompanyEmployee =  3; // private Company only
  public RoledCompanyTruck = 6; // private CompanyTruck  only
  public RoledCompanyTruckEmployee=4; // private CompanyTruck  only


  constructor(private router: Router) {
    
   
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
    
   
  
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS_andalus: Menu[] = [
    {
      headTitle1: "MA Academy",
      headTitle2: "إدارة المحتوى التعليمي",
    },
    {
      title: "المنشورات",
      icon: "activity",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewPosts",
          title: "ادارة المنشورات",
          type: "link",
        },
      ],
    },
    {
      title: "اخطارات",
      icon: "activity",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/Anannouncement",
          title: "ادارة الاخطارات",
          type: "link",
        },
      ],
    },
    {
      title: "المراحل الدراسية",
      icon: "user",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewEducationLevel",
          title: "ادارة المراحل الدراسية",
          type: "link",
        },
      ],
    },
    {
      title: "المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewCourses",
          title: "ادارة المواد",
          type: "link",
        },
      ],
    },
    {
      title: "تصنيفات المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewSubSubject",
          title: "ادارة تصنيفات المواد",
          type: "link",
        },
      ],
    },
    {
      title: "تصنيفات محتوى المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewSubCourseContent",
          title: "ادارة تصنيفات محتوى المواد",
          type: "link",
        },
      ],
    },
    {
      title: "محتوى المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewCourseLecture",
          title: "ادارة محتوى المواد",
          type: "link",
        },
      ],
    },
    {
      title: "الطلاب",
      icon: "user",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewStudents",
          title: "ادارة الطلاب",
          type: "link",
        },
      ],
    },
    {
      title: "المدرسين",
      icon: "user",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewTeachers",
          title: "ادارة المدرسين",
          type: "link",
        },
      ],
    },
    {
      title: "طلبات المدرسين",
      icon: "user",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewTeacherRequests",
          title: "ادارة طلبات المدرسين",
          type: "link",
        },
      ],
    },
    {
      title: "اولياء الأمور",
      icon: "user",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewParent",
          title: "ادارة اولياء الأمور",
          type: "link",
        },
      ],
    },
    {
      title: "المسؤولين",
      icon: "user-plus",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewUser",
          title: "ادارة المسؤولين",
          type: "link",
        },
      ],
    },
    // {
    //   title: "المحاضرات الاونلاين",
    //   icon: "user-plus",
    //   type: "sub",
    //   badgeType: "success",
    //   children: [
    //     {
    //       path: "admin/InsertZoom",
    //       title: "ادارة محاضرات اونلاين",
    //       type: "link",
    //     },
    //   ],
    // },
    {
      title: "العروض",
      icon: "activity",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewOffer",
          title: "ادارة العروض",
          type: "link",
        },
      ],
    },

  ];
// ======================================================
  MEGAMENUITEMS: Menu[] = [
    {
      title: "Error Pages",
      type: "sub",
      active: true,
      children: [
        {
          path: "javascript:void(0);",
          title: "Error Page 400",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Error Page 401",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Error Page 403",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Error Page 404",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Error Page 500",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Error Page 503",
          type: "extLink",
        },
      ],
    },
    {
      title: "Authentication",
      type: "sub",
      active: false,
      children: [
        { path: "javascript:void(0);", title: "Login Simple", type: "extLink" },
        {
          path: "javascript:void(0);",
          title: "Login BG Image",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Login BG Video",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Simple Register",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Register BG Image",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Register BG Video",
          type: "extLink",
        },
      ],
    },
    {
      title: "Usefull Pages",
      type: "sub",
      active: false,
      children: [
        { path: "javascript:void(0);", title: "Search Pages", type: "extLink" },
        { path: "javascript:void(0);", title: "Unlock User", type: "extLink" },
        {
          path: "javascript:void(0);",
          title: "Forgot Password",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Reset Password",
          type: "extLink",
        },
        { path: "javascript:void(0);", title: "Maintenance", type: "extLink" },
      ],
    },
    {
      title: "Email templates",
      type: "sub",
      active: false,
      children: [
        {
          path: "http://admin.pixelstrap.com/cuba/theme/basic-template.html",
          title: "Basic Email",
          type: "extTabLink",
        },
        {
          path: "http://admin.pixelstrap.com/cuba/theme/email-header.html",
          title: "Basic With Header",
          type: "extTabLink",
        },
        {
          path: "http://admin.pixelstrap.com/cuba/theme/template-email.html",
          title: "Ecomerce Template",
          type: "extTabLink",
        },
        {
          path: "http://admin.pixelstrap.com/cuba/theme/template-email-2.html",
          title: "Email Template 2",
          type: "extTabLink",
        },
        {
          path: "http://admin.pixelstrap.com/cuba/theme/ecommerce-templates.html",
          title: "Ecommerce Email",
          type: "extTabLink",
        },
        {
          path: "http://admin.pixelstrap.com/cuba/theme/email-order-success.html",
          title: "Order Success",
          type: "extTabLink",
        },
      ],
    },
    {
      title: "Coming Soon",
      type: "sub",
      active: false,
      children: [
        {
          path: "javascript:void(0);",
          title: "Coming Simple",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Coming BG Image",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Coming BG Video",
          type: "extLink",
        },
      ],
    },
  ];

  LEVELMENUITEMS: Menu[] = [
    {
      path: "javascript:void(0);",
      title: "File Manager",
      icon: "git-pull-request",
      type: "extLink",
    },
    {
      title: "Users",
      icon: "users",
      type: "sub",
      active: false,
      children: [
        {
          path: "javascript:void(0);",
          title: "All Users",
          icon: "users",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "User Profile",
          icon: "users",
          type: "extLink",
        },
        {
          path: "javascript:void(0);",
          title: "Edit Profile",
          icon: "users",
          type: "extLink",
        },
      ],
    },
    {
      path: "javascript:void(0);",
      title: "Bookmarks",
      icon: "heart",
      type: "extLink",
    },
    {
      path: "javascript:void(0);",
      title: "Calender",
      icon: "calendar",
      type: "extLink",
    },
    {
      path: "javascript:void(0);",
      title: "Social App",
      icon: "zap",
      type: "extLink",
    },
  ];

  adminmenu: Menu[] = [
    {
      headTitle1: "MA Academy",
      headTitle2: "إدارة المحتوى التعليمي",
    },
    {
      title: "المنشورات",
      icon: "activity",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewPosts",
          title: "ادارة المنشورات",
          type: "link",
        },
      ],
    },
    {
      title: "اخطارات",
      icon: "activity",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/Anannouncement",
          title: "ادارة الاخطارات",
          type: "link",
        },
      ],
    },
  
    {
      title: "المراحل الدراسية",
      icon: "user",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewEducationLevel",
          title: "ادارة المراحل الدراسية",
          type: "link",
        },
      ],
    },
    {
      title: "المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewCourses",
          title: "ادارة المواد",
          type: "link",
        },
      ],
    },
    {
      title: "تصنيفات المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewSubSubject",
          title: "ادارة تصنيفات المواد",
          type: "link",
        },
      ],
    },
    {
      title: "تصنيفات محتوى المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewSubCourseContent",
          title: "ادارة تصنيفات محتوى المواد",
          type: "link",
        },
      ],
    },
    {
      title: "محتوى المواد",
      icon: "book-open",
      type: "sub",
      badgeType: "success",
      children: [
        {
          path: "admin/ViewCourseLecture",
          title: "ادارة محتوى المواد",
          type: "link",
        },
      ],
    }

  ];


  items = new BehaviorSubject<Menu[]>(this.isSuperAdmin == 'true' ? this.MENUITEMS_andalus : this.adminmenu);
  megaItems = new BehaviorSubject<Menu[]>(this.MEGAMENUITEMS);
  levelmenuitems = new BehaviorSubject<Menu[]>(this.LEVELMENUITEMS);
}

