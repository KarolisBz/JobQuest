import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobHandlerService } from '../Services/job-handler.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonInfiniteScroll, IonItem, IonList, IonInfiniteScrollContent, IonButton, IonInput, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';
import { BadgeHandlerService } from '../Services/badge-handler.service';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.page.html',
  styleUrls: ['./job-posts.page.scss'],
  standalone: true,
  imports: [IonLabel, IonInput, IonButton, IonInfiniteScrollContent, IonList, IonItem, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonInfiniteScroll, RouterLinkWithHref]
})
export class JobPostsPage implements OnInit {
  // class variables
  public jobPosts!: string;
  jobData:any = [];

  // constructor
  constructor(private activatedRoute: ActivatedRoute, private jobService:JobHandlerService, private router:Router, private badgeHandlerService:BadgeHandlerService) {}

  ngOnInit() {
    // fetching ID
    this.jobPosts = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // on page initilization, subscribe to api data
    this.jobService.GetJobData().subscribe(
      (data)=>{
        console.log(data);
        this.jobData = data.results;

         // setting number of results
         this.badgeHandlerService.setJobNum(data.results.length);

         // adding commas to wage strings
         this.jobData.forEach((job: { [x: string]: any; }) => {
          job['stringMinWage'] = this.addCommasToNumber(job['minimumSalary']);
          job['stringMaxWage'] = this.addCommasToNumber(job['maximumSalary']);
         });
      }
    );
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
}