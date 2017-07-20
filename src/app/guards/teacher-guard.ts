
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TeacherGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isTeacher()) {
      return true;
    }else {
        this.router.navigate(['notfound']);
      return false;
    }
  }
}

