import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './user/users.component';
import { CampusesComponent } from './campus/campuses.component';
import { CampusDetailComponent } from './campus/campus-detail/campus-detail.component';
import { ClassesComponent } from './class/class.component';
import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { CourseComponent } from './course/course.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { SectionResolver } from "app/resolvers/section-teach-resolver";
import { SectionCourseResolver } from "app/resolvers/section-course-resolver";
import { TeachersResolver } from "app/resolvers/teachers-resolver";
import { CoursesResolver } from "app/resolvers/courses-resolver";
import { ClassCourseResolver } from "app/resolvers/class-course-resolver";
import { StudentsResolver } from "app/resolvers/students-resolver";
import { StudentComponent } from "app/dashboard/student/student.component";
import { TeacherComponent } from "app/dashboard/teacher/teacher.component";
import { ActivityComponent } from "app/dashboard/activity/activity.component";
import { StudentResolver } from "app/resolvers/student-resolver";
import { ClassesResolver } from "app/resolvers/classes-resolver";
import { SectionsResolver } from "app/resolvers/sections-resolver";
import { CanActivateViaAuthGuard } from "app/guards/auth-guard";
import { TeacherGuard } from "app/guards/teacher-guard";
import { AdminGuard } from "app/guards/admin-guard";
import { AccessGuard } from "app/guards/access-guard";
import { AuthService } from '../services/auth.service';
import { PERMISSIONS } from "app/config/permissions";
import { TeacherResolver } from "app/resolvers/teacher-resolver";


const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AccessGuard],
        data: { permissions: [PERMISSIONS.ADMIN] },
        children: [
            {
                path: 'users', component: UsersComponent,
                resolve: {
                    students: StudentsResolver,
                    teachers: TeachersResolver
                }

            },
            {
                path: 'students/:id', component: StudentComponent,
                resolve: {
                    student: StudentResolver,
                    classes: ClassesResolver,
                    sections: SectionsResolver
                }

            },
            {
                path: 'teachers/:id', component: TeacherComponent,
                resolve: {
                    teacher: TeacherResolver,
                }
            },
            { path: 'activities/:id', component: ActivityComponent },
            { path: 'campuses', component: CampusesComponent },
            { path: 'classes', component: ClassesComponent },
            { path: 'courses', component: CourseComponent },
            { path: 'campuses/:id', component: CampusDetailComponent },
            {
                path: 'classes/:id', component: ClassDetailComponent,
                resolve: {
                    courses: ClassCourseResolver,
                    allCourses: CoursesResolver
                }
            },
            { path: 'courses/:id', component: CourseDetailComponent },
            {
                path: 'sections/:id', component: SectionDetailComponent,
                resolve: {
                    teachings: SectionResolver,
                    courses: SectionCourseResolver,
                    teachers: TeachersResolver
                }
            },
            { path: '', component: CampusesComponent },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}