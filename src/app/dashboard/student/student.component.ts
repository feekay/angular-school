import { Component, OnInit } from '@angular/core';
import { Campus } from "app/models/campus";
import { Class } from "app/models/class";
import { Section } from "app/models/section";
import { Student } from "app/models/student";
import { StudentService } from "app/services/student.service";
import { TeacherService } from "app/services/teacher.service";
import { SectionService } from "app/services/section.service";
import { ActivatedRoute } from "@angular/router";
import { CampusService } from "app/services/campus.service";
import { ClassService } from "app/services/class.service";
import { Course } from "app/models/course";
import { Activity } from "app/models/activity";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  errorMessage: string;
  classes: Class[];
  campuses: Campus[];
  sections: Section[];

  student: Student;
  section: Section;

  selectedClass: Class;
  selectedCampus: Campus;

  courses:Course[];
  activities:Activity[];
  constructor(
    private campusService: CampusService,
    private classService: ClassService,
    private sectionService: SectionService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.student = this.route.snapshot.data['student'];
    if (this.route.snapshot.data['student'].SectionId) {
      this.section = this.route.snapshot.data['student'].Section;
      this.sectionService.getTeachings(this.section.id).subscribe(
            courses => {this.courses = courses;console.log(this.courses)},
            error => this.errorMessage = error
          );
          this.sectionService.getActivities(this.section.id).subscribe(
            activities => this.activities = activities,
            error => this.errorMessage = error
          );
    }
    else {
      this.section = null;
      this.campusService.getCampuses().subscribe(
        campuses => this.campuses = campuses,
        error => this.errorMessage = error
      );
      this.classes = this.route.snapshot.data['classes'];
      console.log(this.classes);
      this.sections = this.route.snapshot.data['sections'];
    }
  }

  assignSection(sectionId) {
    
    this.sectionService.assignStudent(sectionId, this.student.id).then(function () {
      this.sectionService.getSection(sectionId).subscribe(
        (section) => this.section=section,
        (error) => { }
      )
    }.bind(this)).catch(function (error) {
      console.log(error);
    }.bind(this));
  }

  filterClasses() {
    return this.classes.filter(function (cls) {
      if (this.selectedCampus)
        return cls.CampusId === this.selectedCampus.id;      
      return false;
    }.bind(this));
  }
  filterSections() {
    return this.sections.filter(function (sec) {
      if (this.selectedClass)
        return sec.ClassId === this.selectedClass.id;
      return false;
    }.bind(this));
  }
}
