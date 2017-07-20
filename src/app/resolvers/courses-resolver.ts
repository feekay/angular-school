import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CourseService } from "app/services/course.service";
@Injectable()
export class CoursesResolver implements Resolve<any> {

    constructor(private service: CourseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.service.getCourses();
    }

}