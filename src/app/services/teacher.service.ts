import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { Teacher } from '../models/teacher';
import { Helper } from '../services/helper';


import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "app/services/auth.service";

@Injectable()
export class TeacherService {

    private teacherUrl = baseUrl + "/teachers";
    private options;
    constructor(private http: Http, authService:AuthService) { 
        this.options = authService.getHeaders();
    }

    registerTeacher(Teacher: any): Promise<any> {
        return this.http.post(this.teacherUrl, Teacher, this.options)
            .toPromise();
    }

    getTeachers(): Observable<any> {
        return this.http.get(this.teacherUrl,this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }

    getTeacher(id:string){
        return this.http.get(this.teacherUrl+'/'+id,this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    getCourses(id:string){
        return this.http.get(this.teacherUrl+'/'+id+'/courses',this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }
    
    assignCourse(id:string, cId:number, sId:number){
        return this.http.post(this.teacherUrl+'/'+id+'/courses', {sectionId:sId,courseId:cId}, this.options)
            .toPromise();
    }
}