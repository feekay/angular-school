import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";
import { PERMISSIONS } from "app/config/permissions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.router.navigate(this.redirectRoute());
  }

  ngOnInit() {
  }
  redirectRoute(): string[] {
    switch (this.authService.getPermission()) {
      case PERMISSIONS.ADMIN:
      case PERMISSIONS.STAFF:
        return ["/dashboard"]
      case PERMISSIONS.TEACHER:
        return ["/teacher"]
      case PERMISSIONS.STUDENT:
        return ["/student"]
    }
  }
}
