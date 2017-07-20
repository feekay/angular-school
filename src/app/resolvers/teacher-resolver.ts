import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TeacherService } from "app/services/teacher.service";
@Injectable()
export class TeacherResolver implements Resolve<any> {

  constructor(private service: TeacherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getTeacher(route.params.id);
  }

}