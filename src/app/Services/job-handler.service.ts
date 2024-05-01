import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // http import
import { Observable } from 'rxjs'; // rxjs

@Injectable({
  providedIn: 'root'
})
export class JobHandlerService {
  // class Vars
  apiUrl:string = "https://www.reed.co.uk/api/1.0/search?keywords=accountant&location=galway&distancefromlocation=15";
  username:string = "a467dbb3-e3e7-44de-a625-6d6da6a85db0";
  password:string = "";
  // creating a header to hold the API key (they asked the key to be put in username)
  apiOptions:any = {                                                                                                                                                                                 
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
    }), 
  };

  // constructor + creating httpClient instance
  constructor(private httpClient:HttpClient) { }
  
  GetJobData():Observable<any> {
    return this.httpClient.get("https://www.themuse.com/api/public/jobs?page=50&descending=true");
  }
}