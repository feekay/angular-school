import { Component, OnInit } from '@angular/core';
import { StudentService } from "app/services/student.service";
import { Student } from "app/models/student";
import { Section } from "app/models/section";
import { SectionService } from "app/services/section.service";
import { AuthService } from "app/services/auth.service";
import { Course } from "app/models/course";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  errorMessage: any;

  student: Student;
  section: Section;
  courses: Course[];
  constructor(private authService: AuthService, private service: StudentService, private sectionService: SectionService) {
    service.getStudent(this.authService.getId()).subscribe(
      student => { this.student = student; this.section = student.Section },
      error => this.errorMessage = error
    );
    if (this.section) {
      sectionService.getCourses(this.section.id).subscribe(
        courses => this.courses = courses,
        error => this.errorMessage = error
      );
    }
  }

  ngOnInit() {
  }

}
