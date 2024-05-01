import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // http import
import { Observable } from 'rxjs'; // rxjs

@Injectable({
  providedIn: 'root'
})
export class JobHandlerService {
  // class Vars
  apiUrl:string = "https://www.themuse.com/api/public/jobs?location=Galway%2C%20Ireland&page=20&descending=true";

  // constructor + creating httpClient instance
  constructor(private httpClient:HttpClient) { }
  
  GetJobData():Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
}