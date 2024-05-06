import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonMenuButton, IonSearchbar } from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { BadgeHandlerService } from '../Services/badge-handler.service';
import { SortingAlgorithmsService } from '../Services/sorting-algorithms.service';
import { DataHandlerService } from '../Services/data-handler.service';
import { addIcons } from 'ionicons';
import { returnUpBack } from 'ionicons/icons';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.page.html',
  styleUrls: ['./pending-requests.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonSearchbar]
})
export class PendingRequestsPage implements OnInit {
// class variables
public pendingRequests!: string;
pendingJobData:any = [];
constPendingJobData:any = [];
searchBarEntery:string = "";

// constructor
constructor(private activatedRoute: ActivatedRoute, private router:Router, private badgeHandlerService: BadgeHandlerService, private sortingAlgorithms: SortingAlgorithmsService, private dataHandlerService:DataHandlerService) {
  // adding icons
  addIcons({returnUpBack});
}

ngOnInit() {
  // fetching ID
  this.pendingRequests = this.activatedRoute.snapshot.paramMap.get('id') as string;

  // on page initilization, fetch inital saved data to start off with
  this.dataHandlerService.getData(
    (dataWrapper: { [x: string]: any; }): any => {
      this.pendingJobData = dataWrapper['pendingJobs'];
      this.constPendingJobData = dataWrapper['pendingJobs'];

      // setting number of results
      this.badgeHandlerService.setPendingNum(this.pendingJobData.length);

      // adding commas to wage strings
      this.pendingJobData.forEach((job: { [x: string]: any; }) => {
        job['stringMinWage'] = this.addCommasToNumber(job['minimumSalary']);
        job['stringMaxWage'] = this.addCommasToNumber(job['maximumSalary']);
      });
    });
}

toJobInfo(jobObj: any) {
  // creating object wrapper to send to next page
  // this method creates a very long url, but on mobile phones we can't see the url anyways
  const params: NavigationExtras = {
    queryParams: jobObj,
  }

  // routing to specified page
  this.router.navigate(['/job-info/' + jobObj.jobTitle], params);
}

// adds commas to a number and returns as string
private addCommasToNumber(val: number): string {
  if (val != null) {
    let tag = "";

    // adding per hr tag if below 80 euro as wage
    // api does not give us payment type, so for this project we will assume
    // the cut of rate to be as below
    if (val < 1000 && val > 80) tag = "/day";
    else if (val < 80) tag = "/hr";

    return val.toLocaleString() + tag;
  }
  return "not disclosed";
}

// clears the 2 way databinding data
clearInput() {
  this.searchBarEntery = "";
  this.searchJob();
}

// sorts all jobs that are closest to search bar input in desc order in respect to their title
// this mini search engine is not case sensitive
public searchJob()
{
  // if search is empty, return default search results
  if (this.searchBarEntery == "" || this.searchBarEntery == " ") {
    this.pendingJobData = this.constPendingJobData;

    // setting number of results
    this.badgeHandlerService.setJobNum(this.pendingJobData.length);
    return;
  }

  let likeness:any = [];
  let termWords = this.searchBarEntery.toLowerCase().split(" ");

  // giving each string a likeableness value based on their first letters of similarity
  this.constPendingJobData.forEach((job: any) => {
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
  this.pendingJobData = []; // clearing array
  this.sortingAlgorithms.quickSort(likeness).forEach((sortedObj: any) => {
    if (sortedObj['totalScore'] > 0) {
      this.pendingJobData.push(sortedObj['job']);
    }
  });

 // setting number of results
 this.badgeHandlerService.setJobNum(this.pendingJobData.length);
}
}
