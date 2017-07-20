import { Component, OnInit } from '@angular/core';
import { Teaching } from "app/models/teaching";
import { TeacherService } from "app/services/teacher.service";
import { Teacher } from "app/models/teacher";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {
  errorMessage: string = "";
  courses: Teaching;
  details: Teacher;

  constructor(private teacherService: TeacherService, authService: AuthService) {
    this.teacherService.getTeacher(authService.getId()).subscribe(
      teacher => this.details = teacher,
      error => this.errorMessage = error
    );
    this.teacherService.getCourses(authService.getId()).subscribe(
      courses => this.courses = courses,
      error => this.errorMessage = error
    );
  }

  ngOnInit() {
  }
}
