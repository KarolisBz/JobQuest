import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // used for 2 way databinding
import { JobHandlerService } from '../Services/job-handler.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonInfiniteScroll, IonItem, IonList, IonInfiniteScrollContent, IonButton, IonInput, IonLabel, IonSearchbar, IonIcon, IonFabButton, IonFabList, IonFab, IonCardContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BadgeHandlerService } from '../Services/badge-handler.service';
import { addIcons } from 'ionicons';
import { returnUpBack } from 'ionicons/icons';
import { DataHandlerService } from '../Services/data-handler.service';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.page.html',
  styleUrls: ['./job-posts.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonFab, IonFabList, IonFabButton, IonSearchbar, IonLabel, IonInput, IonButton, IonInfiniteScrollContent, IonList, IonItem, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonInfiniteScroll, IonIcon]
})
export class JobPostsPage implements OnInit {
  // class variables
  public jobPosts!: string;
  jobData:any = [];
  constJobData:any = [];
  searchBarEntery:string = "";

  // constructor
  constructor(private activatedRoute: ActivatedRoute, private jobService: JobHandlerService, private badgeHandlerService: BadgeHandlerService, private router:Router ) {
    // adding icons
    addIcons({returnUpBack});
  }

  ngOnInit() {
    // fetching ID
    this.jobPosts = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // on page initilization, subscribe to api data
    this.jobService.GetJobData().subscribe(
      (data) => {
        // remove 1 - 40 random objects from our fixed 100 objects to simulate the non-static behaviour of API returns
        // this is for project display only, real app would call a API not from json blog
        let removeNumber = Math.floor((Math.random() * 40));
        for (let i: number = 0; i < removeNumber; i++) {
          data.results.splice(i, 1);
        }

        // setting page data to remaining results
        this.jobData = data.results;
        this.constJobData = data.results; // is not effected by sorting

        // setting number of results
        this.badgeHandlerService.setJobNum(this.jobData.length);

        // adding commas to wage strings, also adding hasApplied attribute
        this.jobData.forEach((job: { [x: string]: any; }) => {
          job['stringMinWage'] = this.jobService.wageToString(job['minimumSalary']);
          job['stringMaxWage'] = this.jobService.wageToString(job['maximumSalary']);
        });
      }
    );
  }

  toJobInfo(jobObj: any) {
    // shared version of function so edits only have to be made on 1 function
    this.jobService.toJobInfo(jobObj, this.router.url);
  }

  // clears the 2 way databinding data
  clearInput() {
    this.searchBarEntery = "";
    this.searchJob();
  }

  // gets similer words to search input and changes result number on badge
  public searchJob()
  {
    // fetching similer jobs
    this.jobData = this.jobService.getSimilerJobs(this.searchBarEntery, this.jobData, this.constJobData);

     // setting number of results
    this.badgeHandlerService.setJobNum(this.jobData.length);
  }
}