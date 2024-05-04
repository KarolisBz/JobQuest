import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // http import
import { Observable } from 'rxjs'; // rxjs

@Injectable({
  providedIn: 'root'
})
export class JobHandlerService {
  // class Vars
  apiUrl:string = "https://jsonblob.com/api/jsonBlob/1236327344645201920";

  // constructor + creating httpClient instance
  constructor(private httpClient:HttpClient) { }
  
  GetJobData():Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
}