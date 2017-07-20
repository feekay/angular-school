import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { TeacherService } from "app/services/teacher.service";
import { ActivatedRoute } from '@angular/router';
import { Student } from "app/models/student";
import { Teacher } from "app/models/teacher";
import { StudentService } from "app/services/student.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  teachers:Teacher[];
  students:Student[];
  errorMessage: string;
  constructor(private teacherService: TeacherService, private studentService:StudentService,private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.teachers=this.route.snapshot.data['teachers'];
    this.students=this.route.snapshot.data['students'];
  }

}
