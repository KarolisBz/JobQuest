import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonMenuButton, IonSearchbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { BadgeHandlerService } from '../Services/badge-handler.service';
import { DataHandlerService } from '../Services/data-handler.service';
import { JobHandlerService } from '../Services/job-handler.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { returnUpBack } from 'ionicons/icons';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonSearchbar]
})
export class ArchivedPage implements OnInit {
 // class variables
 public pendingRequests!: string;
 archivedJobData: any = [];
 constArchivedJobData: any = [];
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
   this.archivedJobData = dataWrapper['archivedJobs'];
   this.constArchivedJobData = dataWrapper['archivedJobs'];

   // setting number of results
   this.badgeHandlerService.setArchivedNum(this.archivedJobData.length);
 }

 // code runs when page is accessed, fetching updated info
 ionViewWillEnter() {
   // different from onInit as it re-sorts when necessary and doesn't add wage to string
   this.setPageData(this.dataHandlerService.getData()['archivedJobs']);
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
   this.archivedJobData = this.jobService.getSimilerJobs(this.searchBarEntery, this.archivedJobData, this.constArchivedJobData);

   // setting number of results
   this.badgeHandlerService.setPendingNum(this.archivedJobData.length);
 }

 // updates the pages data for visuals
 setPageData(newData: any) {
   // if data is sorted, we need to resort it when updating data
   if (this.constArchivedJobData.length != this.archivedJobData.length) {
     this.constArchivedJobData = newData;
     this.archivedJobData = newData;
     this.searchJob();
   }
   else {
     // page is currently not sorted, just update the values
     this.constArchivedJobData = newData;
     this.archivedJobData = newData;
   }

   // setting number of results
   this.badgeHandlerService.setArchivedNum(this.archivedJobData.length);
 }
}
