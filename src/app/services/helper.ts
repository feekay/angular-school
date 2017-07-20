import { Response } from '@angular/http';


export class Helper {
    static extractData(res: Response): any {
        let body;
        try {
            body = res.json();
        }
        catch (err) {
            body = {};
        }
        return body || {};
    }

    static extractArray(res: Response): any {
        let body = res.json();
        return body || [];
    }
    static handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}