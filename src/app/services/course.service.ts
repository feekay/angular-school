import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { Course } from '../models/course';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Helper } from '../services/helper';

import { AuthService } from "app/services/auth.service";


@Injectable()
export class CourseService {

    private courseUrl = baseUrl + "/courses";

    private options;
    constructor(private http: Http, authService:AuthService) { 
        this.options = authService.getHeaders();
    }


    registerCourse(Course: Course): Promise<any> {
        return this.http.post(this.courseUrl, Course, this.options)
            .toPromise();
    }

    getCourses(): Observable<any> {
        return this.http.get(this.courseUrl,this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }

    getCourse(id:number): Observable<Course> {
        return this.http.get(this.courseUrl+'/'+id,this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    getTeachings(id:number):Observable<any> {
        return this.http.get(this.courseUrl+'/'+id+'/teachers',this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }
    
}