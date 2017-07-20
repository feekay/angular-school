import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthService {
    private id: string = "";

    private authUrl = "http://localhost:3000/users/status";
    private loginUrl = "http://localhost:3000/users/login";
    private signupUrl = "http://localhost:3000/users";
    private options = new RequestOptions({ headers: new Headers({ "Content-Type": "application/json" }) });
    private token = "";
    private permission = "";

    constructor(private http: Http) {
        this.token = localStorage.getItem('token') || null;
        this.permission = localStorage.getItem('permission') || null;
    }

    setPermission(perm: string) {
        this.permission = perm;
        localStorage.setItem('permission', perm);
    }

    getPermission() {
        return this.permission || localStorage.getItem('permission');
    }

    setId(id: string) {
        console.log('id');
        this.id = id;
        localStorage.setItem('id', id);
    }

    getId() {
        return this.id || localStorage.getItem('id');
    }

    isAdmin() {
        return this.permission === "admin"
    }

    isTeacher() {
        return this.permission === "teacher"
    }

    isStaff() {
        return this.permission === "staff"
    }

    isStudent() {
        return this.permission === "student"
    }

    setToken(t: string) {
        this.token = t;
        localStorage.setItem('token', t);
    }

    register(username: string, email: string, password: string): Promise<any> {
        return this.http.post(this.signupUrl, { username: username, password: password }, this.options)
            .toPromise();
    }

    login(username: string, password: string): Promise<any> {
        return this.http.post(this.loginUrl, { username: username, password: password }, this.options)
            .toPromise();
    }

    logout() {
        this.setId("");
        this.setToken("");
        this.setPermission("");
    }

    isAuthenticated() {
        return this.http.get(this.authUrl, this.getHeaders()).toPromise();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getHeaders() {
        return new RequestOptions({ headers: new Headers({ "Content-Type": "application/json", "x-access-token": this.token }) });
    }
}
