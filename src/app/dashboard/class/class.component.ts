import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { Class } from '../../models/class';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Class[];
  errorMessage: string;
  constructor(private classService: ClassService) {
  }
  ngOnInit() {
    this.classService.getClasses().subscribe(
      classes => this.classes = classes,
      error => this.errorMessage = <any>error);
  }
}

