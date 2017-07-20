import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ClassService } from "app/services/class.service";

@Injectable()
export class ClassesResolver implements Resolve<any> {

  constructor(private service: ClassService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getClasses();
  }

}
