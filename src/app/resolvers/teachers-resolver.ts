import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TeacherService } from '../services/teacher.service';

@Injectable()
export class TeachersResolver implements Resolve<any> {

  constructor(private service: TeacherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getTeachers();
  }

}
