import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { Teaching } from '../../../models/teaching';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private courseService: CourseService,private route: ActivatedRoute) { }

  errorMessage: string;
  course: Course;
  teachings: Teaching[];
  id: number;
  private sub:any;
  error:string;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.courseService.getCourse(this.id).subscribe(
        course => this.course = course,
        error => this.errorMessage = <any>error);
      this.courseService.getTeachings(this.id).subscribe(
        teachings => this.teachings = teachings,
        error => this.errorMessage = <any>error);
    });
  }
  onDestroy(){
    this.sub.unsubscribe();
  }
}