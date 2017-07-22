import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Course[];
  errorMessage: string;
  constructor(private courseService: CourseService) {
  }
  register(name: string) {
    let course: Course = new Course(name);
    this.courseService.registerCourse(course).then(function () {
      this.courseService.getCourses().subscribe(
        courses => this.courses = courses,
        error => this.errorMessage = <any>error
      );
    }.bind(this)).catch(function(error){
      this.errorMessage =error.json().message;
    });
  }
  ngOnInit() {
    this.courseService.getCourses().subscribe(
      courses => this.courses = courses,
      error => this.errorMessage = <any>error
    );
  }

  myReset() {
    (<any>document.getElementById("myForm")).reset();
  }
}
