import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { Campus } from '../models/campus';
import { Class } from '../models/class';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "app/services/auth.service";
import { Helper } from '../services/helper';


@Injectable()
export class CampusService {

    private campusUrl = baseUrl + "/campuses";

    private options;
    constructor(private http: Http, authService:AuthService) { 
        this.options = authService.getHeaders();
    }

    registerCampus(campus: Campus): Promise<any> {
        return this.http.post(this.campusUrl, campus, this.options)
            .toPromise();
    }

    registerClass(id:number, cls: Class): Promise<any> {
        return this.http.post(this.campusUrl+'/'+id+'/classes', cls, this.options)
            .toPromise();
    }

    getCampuses(): Observable<Campus[]> {
        return this.http.get(this.campusUrl,this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }
    getCampus(id: number): Observable<Campus> {
        return this.http.get(this.campusUrl + '/' + id,this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    getClasses(id: number): Observable<Class[]> {
        return this.http.get(this.campusUrl + '/' + id + '/classes',this.options)
            .map(Helper.extractArray)
            .catch(Helper.handleError);
    }

    
}