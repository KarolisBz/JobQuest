// this class handles the data storage of the program
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BadgeHandlerService } from './badge-handler.service';
import { toLower } from 'ionicons/dist/types/components/icon/utils';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  // service fields
  private dataWrapper: any = {
    pendingJobs: [],
    favoriteJobs: [],
    archivedJobs: [],
    accountData: [],
    currentAccount: [],
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
    await this.storage.set('wrappedData0.3', this.dataWrapper)
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
    let tempStorage = await this.storage.get('wrappedData0.3');
    console.log(tempStorage);

    // if first time loading database, don't overwrite default values
    if (tempStorage != null) {
      this.dataWrapper = tempStorage;

      // setting badge data
      this.badgeHandler.setPendingNum(this.dataWrapper['pendingJobs'].length)
      this.badgeHandler.setArchivedNum(this.dataWrapper['archivedJobs'].length)
      this.badgeHandler.setFavNum(this.dataWrapper['favoriteJobs'].length)

      // checking if to logout / login user from last session
      if (!this.dataWrapper['currentAccount']['stayLoggedIn']) {
        this.dataWrapper['currentAccount'] = [];
      } 
      
      // messages root account data
      this.badgeHandler.accountPortal(this.dataWrapper['currentAccount']);
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
  addFavoriteData(favoriteJobs: any): boolean {
    // only add if it doesn't exist already
    let alreadyExists: boolean = false;

    // using for loop so we can break out early and save some preformance
    for (let i: number = 0; i < this.dataWrapper['favoriteJobs'].length; i++) {
      let job = this.dataWrapper['favoriteJobs'][i];
      if (job['jobId'] == favoriteJobs['jobId']) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      // adding object to data pool
      this.dataWrapper['favoriteJobs'].push(favoriteJobs);

      // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
      this.badgeHandler.setFavNum(this.dataWrapper['favoriteJobs'].length)

      // save changes to storage
      this.saveData()
    }

    return alreadyExists;
  }

  // adds archived job data to be saved
  addArchivedData(archivedJobs: any): boolean {
    // only add if it doesn't exist already
    let alreadyExists: boolean = false;

    // using for loop so we can break out early and save some preformance
    for (let i: number = 0; i < this.dataWrapper['archivedJobs'].length; i++) {
      let job = this.dataWrapper['archivedJobs'][i];
      if (job['jobId'] == archivedJobs['jobId']) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      // adding object to data pool
      this.dataWrapper['archivedJobs'].push(archivedJobs);

      // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
      this.badgeHandler.setArchivedNum(this.dataWrapper['archivedJobs'].length)

      // save changes to storage
      this.saveData()
    }

    return alreadyExists;
  }

  // removes favourite job data to be saved
  removeFavoriteData(favoriteJobs: any): boolean {
    // only removes if it exist already
    let located: boolean = false;

    // using for loop so we can break out early and save some preformance
    for (let i: number = 0; i < this.dataWrapper['favoriteJobs'].length; i++) {
      let job = this.dataWrapper['favoriteJobs'][i];
      if (job['jobId'] == favoriteJobs['jobId']) {
        // found target
        located = true;

        // removing object from data pool
        this.dataWrapper['favoriteJobs'].splice(i, 1);

        // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
        this.badgeHandler.setFavNum(this.dataWrapper['favoriteJobs'].length)

        // save changes to storage
        this.saveData()
        break;
      }
    }

    return located;
  }

  // removes archived job data to be saved
  removeArchivedData(archivedJobs: any): boolean {
    // only add if it exist already
    let located: boolean = false;

    // using for loop so we can break out early and save some preformance
    for (let i: number = 0; i < this.dataWrapper['archivedJobs'].length; i++) {
      let job = this.dataWrapper['archivedJobs'][i];
      if (job['jobId'] == archivedJobs['jobId']) {
        // found target
        located = true;

        // removing object from data pool
        this.dataWrapper['archivedJobs'].splice(i, 1);

        // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
        this.badgeHandler.setArchivedNum(this.dataWrapper['archivedJobs'].length)

        // save changes to storage
        this.saveData()
        break;
      }
    }

    return located;
  }

  // adds account info data to be saved
  addAccountData(accountData: any): boolean {
    // only add if it doesn't exist already
    let alreadyExists: boolean = false;

    // using for loop so we can break out early and save some preformance
    for (let i: number = 0; i < this.dataWrapper['accountData'].length; i++) {
      let acc = this.dataWrapper['accountData'][i];
      if (acc['email'] == accountData['email']) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      // adding object to data pool
      this.dataWrapper['accountData'].push(accountData);

      // save changes to storage
      this.saveData()
    }

    return alreadyExists;
  }

  // attempts to login
  loginUser(accountData: any): boolean  {
    let success: boolean = false;

    // searching for email
     for (let i: number = 0; i < this.dataWrapper['accountData'].length; i++) {
      let acc = this.dataWrapper['accountData'][i];
      if (acc['email'].toLowerCase() == accountData['email'].toLowerCase() && acc['password'] == accountData['password']) {
        success = true;

        // setting new account
        let objCopy = {...acc, stayLoggedIn: accountData['stayLoggedIn']}
        this.dataWrapper['currentAccount'] = objCopy;

        // messages root account data
        this.badgeHandler.accountPortal(this.dataWrapper['currentAccount']);

        // save changes to storage
        this.saveData()
        break;
      }
    }

    return success;
  }
}
