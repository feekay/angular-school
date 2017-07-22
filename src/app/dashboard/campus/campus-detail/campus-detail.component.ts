import { Component, OnInit } from '@angular/core';

import { CampusService } from '../../../services/campus.service';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/class';
import { Campus } from '../../../models/campus';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campus-detail',
  templateUrl: './campus-detail.component.html',
  styleUrls: ['./campus-detail.component.css']
})
export class CampusDetailComponent implements OnInit {

  campus: Campus;
  classes: Class[];
  id: number;
  private sub: any;
  error: string;
  constructor(private route: ActivatedRoute, private campusService: CampusService, private classService: ClassService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.campusService.getCampus(this.id).subscribe(
        campus => this.campus = campus,
        err => this.error = err
      )

      this.campusService.getClasses(this.id).subscribe(
        classes => this.classes = classes,
        err => this.error = err
      )
    });
  }

  addClass(name: string, fee: number) {
    this.campusService.registerClass(this.id, new Class(fee, name)).then(function (c) {
      this.campusService.getClasses(this.id).subscribe(
        classes => this.classes = classes,
        err => this.error = err
      );
    }.bind(this)).catch(function (err) {
      this.err = err.json().message;
    })
  }
  myReset() {
    (<any>document.getElementById("myForm")).reset();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
