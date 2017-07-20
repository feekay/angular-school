import { Component, OnInit } from '@angular/core';
import { Teaching } from "app/models/teaching";
import { TeacherService } from "app/services/teacher.service";
import { ActivatedRoute } from "@angular/router";
import { Teacher } from "app/models/teacher";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  private teacher: Teacher;
  private errorMessage: string;

  courses: Teaching[]
  constructor(private teacherService: TeacherService, private route:ActivatedRoute) {
    this.teacher = this.route.snapshot.data['teacher'];

    this.teacherService.getCourses(this.teacher.id).subscribe(
      courses => this.courses = courses,
      error => this.errorMessage = error
    );
  }

  ngOnInit() {
  }

}
