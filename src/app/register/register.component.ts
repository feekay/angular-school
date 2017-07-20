import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  error: string = "";
  public register(username: string, mail: string, pass: string) {
    this.authService.register(username, mail, pass).then(function (res) {
      this.router.navigate(['/dashboard']);
      this.error = "";
    }.bind(this)).catch(function (error) {
      console.log("An error occured ", error);
      this.error = "Username already in use";
    }.bind(this));
  }
}
