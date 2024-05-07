import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonMenuButton, IonSearchbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BadgeHandlerService } from '../Services/badge-handler.service';
import { DataHandlerService } from '../Services/data-handler.service';
import { addIcons } from 'ionicons';
import { returnUpBack } from 'ionicons/icons';
import { JobHandlerService } from '../Services/job-handler.service';

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
  pendingJobData: any = [];
  constPendingJobData: any = [];
  searchBarEntery: string = "";

  // constructor
  constructor(private activatedRoute: ActivatedRoute, private badgeHandlerService: BadgeHandlerService, private dataHandlerService: DataHandlerService, private jobService: JobHandlerService, private router:Router) {
    // adding icons
    addIcons({ returnUpBack });
  }

  ngOnInit() {
    // fetching ID
    this.pendingRequests = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // on page initilization, fetch inital saved data to start off with
    let dataWrapper = this.dataHandlerService.getData();
    this.pendingJobData = dataWrapper['pendingJobs'];
    this.constPendingJobData = dataWrapper['pendingJobs'];

    // setting number of results
    this.badgeHandlerService.setPendingNum(this.pendingJobData.length);
  }

  // code runs when page is accessed, fetching updated info
  ionViewWillEnter() {
    // different from onInit as it re-sorts when necessary and doesn't add wage to string
    this.setPageData(this.dataHandlerService.getData()['pendingJobs']);
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
  searchJob() {
    // fetching similer jobs
    this.pendingJobData = this.jobService.getSimilerJobs(this.searchBarEntery, this.pendingJobData, this.constPendingJobData);

    // setting number of results
    this.badgeHandlerService.setPendingNum(this.pendingJobData.length);
  }

  // updates the pages data for visuals
  setPageData(newData: any) {
    // if data is sorted, we need to resort it when updating data
    if (this.constPendingJobData.length != this.pendingJobData.length) {
      this.constPendingJobData = newData;
      this.pendingJobData = newData;
      this.searchJob();
    }
    else {
      // page is currently not sorted, just update the values
      this.constPendingJobData = newData;
      this.pendingJobData = newData;
    }

    // setting number of results
    this.badgeHandlerService.setPendingNum(this.pendingJobData.length);
  }
}
