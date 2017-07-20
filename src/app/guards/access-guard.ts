import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AccessGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authService.isAuthenticated().then(function (res) {
      return true;
    }).catch(function (err) {
      this.router.navigate(['/login']);
      return false;
    }.bind(this))
    ) {
      if ((route.data['permissions'].indexOf(this.authService.getPermission()) !== -1)) {
        return true;
      }
      else {
        this.router.navigate(['notfound']);
      }
    }
    return false;
  }
}