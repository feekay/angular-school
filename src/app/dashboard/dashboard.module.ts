import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './dashboard.routing-module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './user/users.component';
import { CampusesComponent } from './campus/campuses.component';
import { CourseComponent } from './course/course.component';
import { ClassesComponent } from './class/class.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { CampusDetailComponent } from './campus/campus-detail/campus-detail.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';


import { CampusService } from '../services/campus.service';
import { CourseService } from '../services/course.service';
import { ClassService } from '../services/class.service';
import { UserService } from '../services/user.service';
import { SectionService } from '../services/section.service';
import { TeacherService } from "app/services/teacher.service";
import { StudentService } from "app/services/student.service";
import { AuthService } from '../services/auth.service';

import { TeachersResolver } from "app/resolvers/teachers-resolver";
import { SectionResolver } from "app/resolvers/section-teach-resolver";
import { SectionCourseResolver } from "app/resolvers/section-course-resolver";
import { ClassCourseResolver } from "app/resolvers/class-course-resolver";
import { CoursesResolver } from "app/resolvers/courses-resolver";
import { StudentsResolver } from "app/resolvers/students-resolver";

import { ActivityComponent } from './activity/activity.component';
import { StudentResolver } from "app/resolvers/student-resolver";
import { SectionsResolver } from "app/resolvers/sections-resolver";
import { ClassesResolver } from "app/resolvers/classes-resolver";
import { CanActivateViaAuthGuard } from "app/guards/auth-guard";
import { AdminGuard } from "app/guards/admin-guard";
import { StaffGuard } from "app/guards/staff-guard";
import { TeacherGuard } from "app/guards/teacher-guard";
import { AccessGuard } from "app/guards/access-guard";
import { TeacherResolver } from "app/resolvers/teacher-resolver";



@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
    CourseComponent,
    CampusesComponent,
    CourseDetailComponent,
    ClassesComponent,
    ClassDetailComponent,
    CampusDetailComponent,
    SectionDetailComponent,
    TeacherComponent,
    StudentComponent,
    ActivityComponent,
  ],
  providers: [
    CampusService,
    UserService,
    CourseService,
    SectionService,
    ClassService,
    TeacherService,
    StudentService,
    SectionResolver,
    SectionCourseResolver,
    TeachersResolver,
    StudentsResolver,
    StudentResolver,
    ClassesResolver,
    SectionsResolver,
    CoursesResolver,
    ClassCourseResolver,
    TeacherResolver,
    CanActivateViaAuthGuard,
    AuthService,
    AccessGuard,
    AdminGuard,
    TeacherGuard,
    StaffGuard
    ]
})
export class DashboardModule { }
