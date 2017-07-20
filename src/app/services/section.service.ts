import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { Section } from '../models/section';
import { Student } from '../models/student';
import { Activity } from '../models/activity';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "app/services/auth.service";
import { Helper } from '../services/helper';


@Injectable()
export class SectionService {
    private teacherUrl: string = baseUrl + "/teachers";
    private sectionUrl = baseUrl + "/sections";

    private options;
    constructor(private http: Http, authService: AuthService) {
        this.options = authService.getHeaders();
    }

    getSections(): Observable<Section[]> {
        return this.http.get(this.sectionUrl, this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    getSection(id: number): Observable<Section> {
        return this.http.get(this.sectionUrl + '/' + id, this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    getStudents(id: number): Observable<Student[]> {
        return this.http.get(this.sectionUrl + '/' + id + '/students', this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }
    getActivities(id: number): Observable<Activity[]> {
        return this.http.get(this.sectionUrl + '/' + id + '/activities', this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }
    registerActivity(id: number, activity: Activity): Promise<any> {
        return this.http.post(this.sectionUrl + '/' + id + '/activities', activity, this.options)
            .toPromise();
    }

    getCourses(id: number) {
        return this.http.get(this.sectionUrl + '/' + id + '/courses', this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }

    assignTeacher(sectionId: number, courseId: number, teacherId: string) {
        return this.http.post(this.teacherUrl + '/' + teacherId + '/courses', { courseId: courseId, sectionId: sectionId }, this.options)
            .toPromise();
    }
    getTeachings(id:number):Observable<any> {;
        return this.http.get(this.sectionUrl+'/'+id+'/teachers',this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }
    
    assignStudent(id:string, sId:string){
        return this.http.post(this.sectionUrl+'/'+id+'/students', {studentId:sId}, this.options)
            .toPromise();
    }

}