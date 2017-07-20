import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SectionService } from '../services/section.service';

@Injectable()
export class SectionResolver implements Resolve<any> {

  constructor(private secService: SectionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.secService.getTeachings(route.params.id);
  }

}