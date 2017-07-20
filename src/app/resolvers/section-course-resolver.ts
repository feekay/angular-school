import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SectionService } from '../services/section.service';

@Injectable()
export class SectionCourseResolver implements Resolve<any> {

  constructor(private secService: SectionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.secService.getCourses(route.params.id);
  }

}