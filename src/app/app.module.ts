import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { CanActivateViaAuthGuard } from "app/guards/auth-guard";
import { AccessGuard } from "app/guards/access-guard";
import { LoginGuard } from "app/guards/login-guard";
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';
import { StudentService } from "app/services/student.service";
import { SectionService } from "app/services/section.service";
import { CourseService } from "app/services/course.service";
import { SectionDetailComponent } from "app/dashboard/section-detail/section-detail.component";
import { HomeComponent } from './home/home.component';
import { PERMISSIONS } from "app/config/permissions";


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AccessGuard], data: { permissions: [PERMISSIONS.ADMIN, PERMISSIONS.STUDENT, PERMISSIONS.TEACHER, PERMISSIONS.STAFF] } },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'register', component: RegisterComponent },
  { path: 'student', component: StudentViewComponent, canActivate: [AccessGuard], data: { permissions: [PERMISSIONS.STUDENT] } },
  { path: 'teacher', component: TeacherViewComponent, canActivate: [AccessGuard], data: { permissions: [PERMISSIONS.TEACHER] } },
  { path: 'sections', component: SectionDetailComponent, canActivate: [AccessGuard], data: { permissions: [PERMISSIONS.TEACHER] } },
  //  { path: 'profile',component:ProfileViewComponent, data:{permission:[PERMISSIONS.STUDENT,PERMISSIONS.TEACHER]}}
  { path: '**', component: PageNotFoundComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    StudentViewComponent,
    TeacherViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, LoginGuard, StudentService, AccessGuard, SectionService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
