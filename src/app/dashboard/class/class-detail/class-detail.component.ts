import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../services/class.service';
import { CourseService } from '../../../services/course.service';

import { Class } from '../../../models/class';
import { Section } from '../../../models/section';
import { Course } from '../../../models/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  cls: Class;
  sections: Section[];
  courses: Course[];
  availableCourses: Course[];
  id: number;
  private sub: any;
  error: string;
  constructor(private route: ActivatedRoute, private classService: ClassService, private courseService: CourseService) { }



  ngOnInit() {
    this.availableCourses = this.route.snapshot.data['allCourses'];
    this.courses = this.route.snapshot.data['courses'];
  
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.classService.getClass(this.id).subscribe(
        cls => this.cls = cls,
        err => this.error = err
      );
      this.classService.getSections(this.id).subscribe(
        sections => this.sections = sections,
        err => this.error = err
      );
      /*
      this.classService.getCourses(this.id).subscribe(
        courses => this.courses = courses,
        err => this.error = err
      );
      */

      /*    
      this.courseService.getCourses().subscribe(
        courses => this.availableCourses = courses,
        err => this.error = err
      );
      */
    });
  }

  registerSection(number: number) {
    let section: Section = new Section(number);
    this.classService.addSection(this.id, section).then(function () {
      this.classService.getSections(this.id).subscribe(
        sections => this.sections = sections,
        err => this.error = err
      );
    }.bind(this)).catch(function (err) {
      console.log(err);
    });
  }

  addCourse(id: number) {
    this.classService.addCourse(this.id, id).then(function () {
      this.classService.getCourses(this.id).subscribe(
        sections => this.sections = sections,
        err => this.error = err
      );
    }.bind(this)).catch(function (err) {
      console.log(err);
    });
  }

  filterCommon(): Course[] {
    let x=this.courses.map(function (course: Course) {
      return course.id;
    });
    return this.availableCourses.filter(function (n) {
      return x.indexOf(n.id) === -1;
    }.bind(this));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
