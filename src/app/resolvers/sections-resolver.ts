import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SectionService } from "app/services/section.service";

@Injectable()
export class SectionsResolver implements Resolve<any> {

  constructor(private service: SectionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getSections();
  }

}
