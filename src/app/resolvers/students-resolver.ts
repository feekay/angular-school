import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StudentService } from "app/services/student.service";

@Injectable()
export class StudentsResolver implements Resolve<any> {

  constructor(private service: StudentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getStudents();
  }

}
