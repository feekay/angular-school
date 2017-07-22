import { Component, OnInit } from '@angular/core';
import { StudentService } from "app/services/student.service";
import { Student } from "app/models/student";
import { Section } from "app/models/section";
import { SectionService } from "app/services/section.service";
import { AuthService } from "app/services/auth.service";
import { Course } from "app/models/course";
import { Activity } from "app/models/activity";
import { Teaching } from "app/models/teaching";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  errorMessage: any;

  student: Student;
  section: Section;
  courses: Teaching[];
  activities: Activity[];
  constructor(private authService: AuthService, private service: StudentService, private sectionService: SectionService) {
    service.getStudent(this.authService.getId()).subscribe(
      student => {
      this.student = student; this.section = student.Section;
        if (this.section) {
          sectionService.getTeachings(this.section.id).subscribe(
            courses => {this.courses = courses;console.log(this.courses)},
            error => this.errorMessage = error
          );
          sectionService.getActivities(this.section.id).subscribe(
            activities => this.activities = activities,
            error => this.errorMessage = error
          );
        }
      },
      error => this.errorMessage = error
    );

  }

  ngOnInit() {
  }

}
