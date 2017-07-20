import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { Class } from '../models/class';
import { Course } from '../models/course';
import { Section } from '../models/section';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "app/services/auth.service";
import { Helper } from '../services/helper';


@Injectable()
export class ClassService {

    private classUrl = baseUrl + "/classes";

    private options;
    constructor(private http: Http, authService: AuthService) {
        this.options = authService.getHeaders();
    }


    addSection(id: number, sec: Section): Promise<any> {
        return this.http.post(this.classUrl + '/' + id + '/sections', sec, this.options)
            .toPromise();
    }
    addCourse(id: number, courseId: number): Promise<any> {
        return this.http.post(this.classUrl + '/' + id + '/courses', { courseId: courseId }, this.options)
            .toPromise();
    }

    getClasses(): Observable<Class[]> {
        return this.http.get(this.classUrl,this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }

    getClass(id: number): Observable<Class> {
        return this.http.get(this.classUrl + '/' + id,this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }
    getCourses(id: number): Observable<Course[]> {
        return this.http.get(this.classUrl + '/' + id + '/courses',this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }
    getSections(id: number): Observable<Section[]> {
        return this.http.get(this.classUrl + '/' + id + '/sections',this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }
    
}