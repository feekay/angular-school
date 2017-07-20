import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StudentService } from "app/services/student.service";

@Injectable()
export class StudentResolver implements Resolve<any> {

  constructor(private service: StudentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getStudent(route.params.id);
  }

}