import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ClassService } from "app/services/class.service";

@Injectable()
export class ClassCourseResolver implements Resolve<any> {

  constructor(private clsService: ClassService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.clsService.getCourses(route.params.id);
  }

}