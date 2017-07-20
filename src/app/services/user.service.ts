import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { User } from '../models/user';
import { Helper } from '../services/helper';


import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "app/services/auth.service";

@Injectable()
export class UserService {

    private userUrl = baseUrl + "/users";
    private options;
    constructor(private http: Http, authService:AuthService) { 
        this.options = authService.getHeaders();
    }

    registerUser(User: User): Promise<any> {
        return this.http.post(this.userUrl, User, this.options)
            .toPromise();
    }

    getUsers(): Observable<any> {
        return this.http.get(this.userUrl,this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    
}