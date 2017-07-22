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

  teachers: Teacher[];
  students: Student[];
  errorMessage: string;
  constructor(private teacherService: TeacherService, private studentService: StudentService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    try{
    this.teachers = this.route.snapshot.data['teachers'];
    this.students = this.route.snapshot.data['students'];
    }catch(err){
      console.log(err);
    }
  }

  registerStudent(fname: string, lname: string, uname: string, gender: string, dob: string, password: string) {
    this.studentService.registerStudent({ firstname: fname, lastname: lname, username: uname, password: password, gender: gender, dob: dob })
      .then(function () {
        this.studentService.getStudents().subscribe(
          students => this.students = students,
          error => this.errorMessage = error
        );
      }.bind(this)).catch(function (err) {
        this.errorMessage = err.json().message;
      })
  }
  registerTeacher(fname: string, lname: string, uname: string, gender: string, dob: string, password: string) {
    this.teacherService.registerTeacher({ firstname: fname, lastname: lname, username: uname, password: password, gender: gender, dob: dob })
      .then(function () {

        this.teacherService.getTeachers().subscribe(
          teachers => this.teachers = teachers,
          error => this.errorMessage = error
        );

      }.bind(this)).catch(function (err) {
        this.errorMessage = err.json().message;
      })
  }

  myReset() {
    (<any>document.getElementById("myForm")).reset();
  }
  myReset2() {
    (<any>document.getElementById("myForm2")).reset();
  }

}
