import { Component, OnInit } from '@angular/core';
import { CampusService } from '../../services/campus.service';
import { Campus } from '../../models/campus';

@Component({
  selector: 'app-campuses',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.css']
})
export class CampusesComponent implements OnInit {

  campuses: Campus[];
  errorMessage: string;
  constructor(private campusService: CampusService) {
  }

  ngOnInit() {
    this.campusService.getCampuses().subscribe(
      campuses => this.campuses = campuses,
      error => this.errorMessage = <any>error);
  }
  register(name: string, address: string) {
    this.campusService.registerCampus(new Campus(name, address)).then(function (res) {
      this.campusService.getCampuses().subscribe(
        campuses => this.campuses = campuses,
        error => this.errorMessage = <any>error);
      this.myReset();
    }.bind(this)).catch(function (err) {
      this.errorMessage = err.json().message;
    }.bind(this));
  }

  myReset() {
    (<any>document.getElementById("myForm")).reset();
    this.errorMessage="";
  }

}
