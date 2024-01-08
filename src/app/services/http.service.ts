// C:\xampp8.2\htdocs\vt_portal_angular\src\app\services\http.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    post(url: string, data: any): Observable<any> {
        const options = { headers: this.getHeaders() };
        return this.http.post(url, data, options);
    }

    get(url: string): Observable<any> {
        const options = { headers: this.getHeaders() };
        return this.http.get(url, options);
    }
}
