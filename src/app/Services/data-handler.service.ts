// this class handles the data storage of the program
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BadgeHandlerService } from './badge-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  // service fields
  private dataWrapper: any = {
    pendingJobs: [],
    favouriteJobs: [],
    archivedJobs: [],
    accountData: [],
  };
  
  // constructor
  constructor(private storage:Storage, private badgeHandler:BadgeHandlerService) {
    this.initializeData();
  };

  // creates datastore on initzliation of service
  async initializeData() {
    await this.storage.create();
    this.loadData();
  }

  // save all data when closing application
  ngOnDestroy(): void {
    this.saveData();
  }
  
  // saves all data
  async saveData() {
    await this.storage.set('wrappedData', this.dataWrapper)
    .then(
      () =>
        {
          console.log("data has been saved locally");
        }
    )
    .catch(
      (error) =>
        {
          console.log(error);
        }
      
    );
  }

  // loads all the data
  async loadData() {
    let tempStorage = await this.storage.get('wrappedData');
    console.log(tempStorage);

    // if first time loading database, don't overwrite default values
    if (tempStorage != null) {
      this.dataWrapper = tempStorage;

      // setting badge data
      this.badgeHandler.setPendingNum(this.dataWrapper['pendingJobs'].length)
    }
  }

  // returns data wrapped to caller function
  getData(): any {
    return this.dataWrapper;
  }

  // adds pending job data to be saved, returns if job already exists in pending job database
  addPendingData(pendingJob: any): boolean {
    // only add if it doesn't exist already
    let alreadyExists: boolean = false;

    // using for loop so we can break out early and save some preformance
    for (let i: number = 0; i < this.dataWrapper['pendingJobs'].length; i++) {
      let job = this.dataWrapper['pendingJobs'][i];
      if (job['jobId'] == pendingJob['jobId']) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      // adding object to data pool
      this.dataWrapper['pendingJobs'].push(pendingJob);

      // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
      this.badgeHandler.setPendingNum(this.dataWrapper['pendingJobs'].length)

      // save changes to storage
      this.saveData()
    }

    return alreadyExists;
  }

  // adds favourite job data to be saved
  addFavouriteData(favouriteJobs: any): void {
    this.dataWrapper['favouriteJobs'].push(favouriteJobs);
  }

  // adds archived job data to be saved
  addArchivedData(archivedJobs: any): void {
    this.dataWrapper['archivedJobs'].push(archivedJobs);
  }

  // sets account info data to be saved
  setAccountData(accountData: any): void {
    this.dataWrapper['accountData'] = accountData;
  }
}
