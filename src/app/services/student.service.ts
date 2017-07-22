import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { Helper } from '../services/helper';


import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "app/services/auth.service";
import { Student } from "app/models/student";

@Injectable()
export class StudentService {

    private studentUrl = baseUrl + "/students";
    private options;
    constructor(private http: Http, authService:AuthService) { 
        this.options = authService.getHeaders();
    }

    registerStudent(student: any): Promise<any> {
        return this.http.post(this.studentUrl, student, this.options)
            .toPromise();
    }

    getStudents(): Observable<any> {
        return this.http.get(this.studentUrl,this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }

    getStudent(id:string){
        return this.http.get(this.studentUrl+'/'+id,this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    getCourses(id:string){
        return this.http.get(this.studentUrl+'/'+id+'/courses',this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }
}