import { Component, OnInit } from '@angular/core';

import { SectionService } from '../../services/section.service';
import { Student } from '../../models/student';
import { Section } from '../../models/section';
import { Activity } from '../../models/activity';
import { Course } from '../../models/course';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from "app/services/course.service";
import { Teaching } from "app/models/teaching";
import { Teacher } from "app/models/teacher";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit {

  constructor(auth:AuthService,private sectionService: SectionService, private courseService: CourseService, /*private teacherService: TeacherService,*/ private route: ActivatedRoute) {

    this.permission= (auth.getPermission()==="admin");
  }

  errorMessage: string;
  section: Section;
  courses: Course[];
  activities: Activity[];
  teachings: Teaching[];
  teachers:Teacher[];
  selectedTeacher:Teacher;

  permission:boolean;
  id: number;
  private sub: any;
  error: string;

  ngOnInit() {
    this.teachings = this.route.snapshot.data['teachings'];
    this.courses= this.route.snapshot.data['courses'];
    this.teachers= this.route.snapshot.data['teachers'];
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.sectionService.getSection(this.id).subscribe(
        Section => this.section = Section,
        error => this.errorMessage = <any>error);

      this.sectionService.getActivities(this.id).subscribe(
        activities => this.activities = activities,
        error => this.errorMessage = <any>error);
    });
  }
  addActivity(date: Date, desc:string) {
    this.sectionService.registerActivity(this.id, new Activity(date, desc)).then(function (c) {
      this.sectionService.getActivities(this.id);
    }.bind(this)).catch(function (err) {
      console.log(err);
    })
  }

  assignTeacher(teacherId, courseId) {
    this.sectionService.assignTeacher(this.id, courseId, teacherId)
      .then(function () {
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  filterCommon(): Course[] {
    let array2 = []
    try {
      array2 = this.teachings.map(function (t) {
        return t.Course.id;
      });
    } catch (err) {
      console.log(err);
    }
    return this.courses.filter(function (n) {
      return array2.indexOf(n.id) === -1;
    });
  }
  onDestroy() {
    this.sub.unsubscribe();
  }
}