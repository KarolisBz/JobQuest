// this class is in charge of fetching api data and handelling some of jobs data functions across multiple pages that contain job data
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // http import
import { Observable } from 'rxjs'; // rxjs
import { SortingAlgorithmsService } from '../Services/sorting-algorithms.service';

@Injectable({
  providedIn: 'root'
})
export class JobHandlerService {
  // class Vars
  apiUrl:string = "https://jsonblob.com/api/jsonBlob/1236327344645201920";

  // constructor + creating httpClient instance + getting sorting algorithms service instance
  constructor(private httpClient:HttpClient, private sortingAlgorithms: SortingAlgorithmsService) { }
  
  // returns api data as an Observable
  GetJobData():Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  // sorts all jobs that are closest to search bar input in desc order in respect to their title
  // this mini search engine is not case sensitive, and returns the sorted job data
  public getSimilerJobs(searchBarEntery:String, jobData:any, constJobData:any)
  {
    // if search is empty, return default search results
    if (searchBarEntery == "" || searchBarEntery == " ") {
      jobData = constJobData;

      return jobData;
    }

    let likeness:any = [];
    let termWords = searchBarEntery.toLowerCase().split(" ");

    // giving each string a likeableness value based on their first letters of similarity
    constJobData.forEach((job: any) => {
      // word vars
      let totalScore: number = 0;
      let jobTitle = job.jobTitle.toLowerCase();

      // fetching every word in said title
      let words:any = jobTitle.split(" ");

      // getting value for each word, and adding it up
      words.forEach((titleContent: string) => {
        termWords.forEach((searchContent: string) => {
          // if both strings are exactly the same, give a large amount of points and don't check each letter
          if (titleContent == searchContent) {
            totalScore += 10;
          }
          else {
            // letter arrays
            let wordLetters = titleContent.split("");
            let searchLetters = searchContent.split("");

            for (let i: number = 0; i < searchContent.length; i++) {
              if (searchLetters[i] == wordLetters[i]) {
                totalScore++;
              }
              else
                break;
            }
          }
        });
      });

      likeness.push({totalScore, job});
    });

    // building array in order using quicksort, not adding anything with a similarity value of 0
    jobData = []; // clearing array
    this.sortingAlgorithms.quickSort(likeness).forEach((sortedObj: any) => {
      if (sortedObj['totalScore'] > 0) {
        jobData.push(sortedObj['job']);
      }
    });

   return jobData;
  }
}