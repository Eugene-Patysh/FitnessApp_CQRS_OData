import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiUrl// 'https://localhost:7164/';
  apiVersion = 'v1.0';

  constructor(private httpClient: HttpClient) { }

  private buildUrl(url: string): string {
    return this.baseUrl + 'api/' + this.apiVersion + '/' + url;
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient
        .get<T>(this.buildUrl(url))
        .pipe(map(response => { return response }));
  }

  post<T>(url: string, request: any): Observable<T> {
    return this.httpClient
      .post<T>(this.buildUrl(url), request)
      .pipe(map(response => { return response; }));
  }

  put<T>(url: string, request: any): Observable<T> {
    return this.httpClient
      .put<T>(this.buildUrl(url), request)
      .pipe(map(response => { return response; }));
  }

  delete<T>(url: string, request: any): Observable<T> {
    return this.httpClient
      .delete<T>(this.buildUrl(url), {
        body: request
    })
    .pipe(map(response => { return response; }));
  }
}
