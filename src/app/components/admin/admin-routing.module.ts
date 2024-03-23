import { AnannouncementsComponent } from './anannouncements/anannouncements.component';
import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InsertActivationComponent } from "./activation/insert-activation/insert-activation.component";
import { ViewActivationComponent } from "./activation/view-activation/view-activation.component";
import { InsertCourseContentComponent } from "./course-content/insert-course-content/insert-course-content.component";
import { ViewCourseContentComponent } from "./course-content/view-course-content/view-course-content.component";
import { InsertCoursesComponent } from "./courses/insert-courses/insert-courses.component";
import { ViewCoursesComponent } from "./courses/view-courses/view-courses.component";
import { InsertEducationlevelComponent } from "./education_level/insert-educationlevel/insert-educationlevel.component";
import { ViewEducationlevelComponent } from "./education_level/view-educationlevel/view-educationlevel.component";
import { InsertOffersComponent } from "./offers/insert-offers/insert-offers.component";
import { ViewOffersComponent } from "./offers/view-offers/view-offers.component";
import { InsertParentsComponent } from "./parents/insert-parents/insert-parents.component";
import { ViewParentsComponent } from "./parents/view-parents/view-parents.component";
// ChangePassword Component



import { ViewProductComponent } from './product/view-product/view-product.component';
import { InsertStudentsComponent } from "./students/insert-students/insert-students.component";
import { ViewStudentsComponent } from "./students/view-students/view-students.component";
import { InsertSubcoursecontentComponent } from "./subcourse-content/insert-subcoursecontent/insert-subcoursecontent.component";
import { RearrangeSubcourseContentComponent } from "./subcourse-content/rearrange-subcourse-content/rearrange-subcourse-content.component";
import { ViewSubcoursecontentComponent } from "./subcourse-content/view-subcoursecontent/view-subcoursecontent.component";
import { InsertSubcourseComponent } from "./subcourse/insert-subcourse/insert-subcourse.component";
import { RearrangeSubcourseComponent } from "./subcourse/rearrange-subcourse/rearrange-subcourse.component";
import { ViewSubcourseComponent } from "./subcourse/view-subcourse/view-subcourse.component";
import { InsertTeachersComponent } from "./teachers/insert-teachers/insert-teachers.component";
import { ViewTeachersComponent } from "./teachers/view-teachers/view-teachers.component";
import { ChangePasswordComponent } from "./User/change-password/change-password.component";
import { UserComponent } from "./User/user/user.component";
import { ViewUserComponent } from "./User/view-user/view-user.component";
import { InsertPdfComponent } from "./course-content/insert-pdf/insert-pdf.component";
import { ViewPdfComponent } from "./course-content/view-pdf/view-pdf.component";
import { InsertZoommeetingComponent } from "./zoom/insert-zoommeeting/insert-zoommeeting.component";
import { ViewStudentsActivatedComponent } from "./students-activated/view-students-activated/view-students-activated.component";
import { ViewTeachercoursesComponent } from "./teacherCourses/view-teachercourses/view-teachercourses.component";
import { InsertExamsComponent } from "./exams/insert-exams/insert-exams.component";
import { ViewExamsComponent } from "./exams/view-exams/view-exams.component";
import { StudentReportingComponent } from "./students/student-reporting/student-reporting.component";
import { ViewPostsComponent } from "./posts/view-posts/view-posts.component";
import { InsertPostsComponent } from "./posts/insert-posts/insert-posts.component";
import { ViewTeacherRequestComponent } from "./teacher-request/view-teacher-request/view-teacher-request.component";
import { ViewTeachersStudentsComponent } from "./teachers/view-teachers-students/view-teachers-students.component";





const routes: Routes = [
    {
        path: "admin",
        children: [
            {
                path: "ViewProduct",
                component: ViewProductComponent,
            },
            {
                path: "ViewTeachers",
                component: ViewTeachersComponent,
            },
            {
                path: "InsertTeachers",
                component: InsertTeachersComponent,
            },
            {
                path: "ViewStudents",
                component: ViewStudentsComponent,
            },
            {
                path: "InsertStudents",
                component: InsertStudentsComponent,
            },
            {
                path: "ViewCourses",
                component: ViewCoursesComponent,
            },
            {
                path: "InsertCourses",
                component: InsertCoursesComponent,
            },
            {
                path: "InsertCoursesPdf",
                component: InsertPdfComponent,
            },
            {
                path: "ViewCoursesPdf",
                component: ViewPdfComponent,
            },
            {
                path: "ViewUser",
                component: ViewUserComponent,
            },
            {
                path: "InsertUser",
                component: UserComponent,
            },
            {
                path: "ViewCourseLecture",
                component: ViewCourseContentComponent,
            },
            {
                path: "ViewTeacherCourses/:id/:teacherName",
                component: ViewTeachercoursesComponent,
            },
            {
                path: "ViewCourseLecture/:id",
                component: ViewCourseContentComponent,
            },
            {
                path: "InsertSubSubject",
                component: InsertSubcourseComponent,
            },
            {
                path: "ViewSubSubject",
                component: ViewSubcourseComponent,
            },
            {
                path: "RearrangeSubSubject/:id",
                component: RearrangeSubcourseComponent,
            },
            {
                path: "ViewEducationLevel",
                component: ViewEducationlevelComponent,
            },
            {
                path: "InsertEducationLevel",
                component: InsertEducationlevelComponent,
            },
            {
                path: "InsertCourseLecture",
                component: InsertCourseContentComponent,
            },
            {
                path: "ViewSubCourseContent",
                component: ViewSubcoursecontentComponent,
            },
            {
                path: "Rearangesubcoursecontent",
                component: RearrangeSubcourseContentComponent,
            },
            {
                path: "InsertSubCourseContent",
                component: InsertSubcoursecontentComponent,
            },
            {
                path: "ViewOffer",
                component: ViewOffersComponent,
            },
            {
                path: "InsertOffer",
                component: InsertOffersComponent,
            },
            {
                path: "ViewParent",
                component: ViewParentsComponent,
            },
            {
                path: "InsertParent",
                component: InsertParentsComponent,
            },
            {
                path: "ChangePassword",
                component: ChangePasswordComponent,
            },   
            {
                path: "ViewActivation",
                component: ViewActivationComponent,
            },   
            {
                path: "InsertActivation",
                component: InsertActivationComponent,
            },   
            {
                path: "InsertZoom",
                component: InsertZoommeetingComponent,
            },   
            {
                path: "ViewActivatedStudents/:id",
                component: ViewStudentsActivatedComponent,
            },   
            {
                path: "ViewExams/:id",
                component: ViewExamsComponent,
            },   
            {
                path: "InsertExams/:id",
                component: InsertExamsComponent,
            },   
            {
                path: "ViewReports/:id",
                component: StudentReportingComponent
            },
            {
             path: "ViewPosts",
             component: ViewPostsComponent
            },
            {
             path: "InsertPosts",
             component: InsertPostsComponent
            },
            {
             path: "ViewTeacherRequests",
             component: ViewTeacherRequestComponent
            },
            {
             path: "ViewTeacherStudents/:teacherId",
             component: ViewTeachersStudentsComponent
            },
            {
             path: "Anannouncement",
             component: AnannouncementsComponent
            }
],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
