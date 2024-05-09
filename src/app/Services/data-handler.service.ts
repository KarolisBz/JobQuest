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
  dataLoaded:boolean = false;
  private dataWrapper: any = {
    accountData: [],
    currentAccount: {
      pendingJobs: [],
      favoriteJobs: [],
      archivedJobs: [],
    },
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
    await this.storage.set('wrappedData0.5', this.dataWrapper)
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
    let tempStorage = await this.storage.get('wrappedData0.5');
    console.log(tempStorage);

    // if first time loading database, don't overwrite default values
    if (tempStorage != null) {
      this.dataWrapper = tempStorage;

      // if data exists load badges
      if (this.dataWrapper['currentAccount']['created']) {
        // setting badge data
        this.badgeHandler.setPendingNum(this.dataWrapper['currentAccount']['pendingJobs'].length)
        this.badgeHandler.setArchivedNum(this.dataWrapper['currentAccount']['archivedJobs'].length)
        this.badgeHandler.setFavNum(this.dataWrapper['currentAccount']['favoriteJobs'].length)
      }

      // checking if to logout / login user from last session
      if (!this.dataWrapper['currentAccount']['stayLoggedIn']) {
        this.dataWrapper['currentAccount'] = [];
      }

      // messages root account data
      this.badgeHandler.accountPortal(this.dataWrapper['currentAccount']);
    }

    this.dataLoaded = true;
  }

  // returns data wrapped to caller function as a promise
  // had to make this function as a promise because data was being requested before it loaded
  getDataAsync = () => {
    return new Promise((resolve) => {
      const checkData = () =>  {
        if (this.dataLoaded) {
          resolve(this.dataWrapper['currentAccount']); // only returns when true
        } else {
          setTimeout(checkData, 500) // check every 0.5 seconds if data has been loaded
        }
      };
      checkData(); // runs the function inside the promise function
    });
  }

  // adds pending job data to be saved, returns if job already exists in pending job database
  addPendingData(pendingJob: any): boolean {
    // only add if it doesn't exist already
    let alreadyExists: boolean = false;

    // using for loop so we can break out early and save some preformance
    for (let i: number = 0; i < this.dataWrapper['currentAccount']['pendingJobs'].length; i++) {
      let job = this.dataWrapper['currentAccount']['pendingJobs'][i];
      if (job['jobId'] == pendingJob['jobId']) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      // adding object to data pool
      this.dataWrapper['currentAccount']['pendingJobs'].push(pendingJob);

      // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
      this.badgeHandler.setPendingNum(this.dataWrapper['currentAccount']['pendingJobs'].length)

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
    for (let i: number = 0; i < this.dataWrapper['currentAccount']['favoriteJobs'].length; i++) {
      let job = this.dataWrapper['currentAccount']['favoriteJobs'][i];
      if (job['jobId'] == favoriteJobs['jobId']) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      // adding object to data pool
      this.dataWrapper['currentAccount']['favoriteJobs'].push(favoriteJobs);

      // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
      this.badgeHandler.setFavNum(this.dataWrapper['currentAccount']['favoriteJobs'].length)

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
    for (let i: number = 0; i < this.dataWrapper['currentAccount']['archivedJobs'].length; i++) {
      let job = this.dataWrapper['currentAccount']['archivedJobs'][i];
      if (job['jobId'] == archivedJobs['jobId']) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      // adding object to data pool
      this.dataWrapper['currentAccount']['archivedJobs'].push(archivedJobs);

      // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
      this.badgeHandler.setArchivedNum(this.dataWrapper['currentAccount']['archivedJobs'].length)

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
    for (let i: number = 0; i < this.dataWrapper['currentAccount']['favoriteJobs'].length; i++) {
      let job = this.dataWrapper['currentAccount']['favoriteJobs'][i];
      if (job['jobId'] == favoriteJobs['jobId']) {
        // found target
        located = true;

        // removing object from data pool
        this.dataWrapper['currentAccount']['favoriteJobs'].splice(i, 1);

        // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
        this.badgeHandler.setFavNum(this.dataWrapper['currentAccount']['favoriteJobs'].length)

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
    for (let i: number = 0; i < this.dataWrapper['currentAccount']['archivedJobs'].length; i++) {
      let job = this.dataWrapper['currentAccount']['archivedJobs'][i];
      if (job['jobId'] == archivedJobs['jobId']) {
        // found target
        located = true;

        // removing object from data pool
        this.dataWrapper['currentAccount']['archivedJobs'].splice(i, 1);

        // changes badge value to total, as search bar gets wiped anyways for anything but job-posts
        this.badgeHandler.setArchivedNum(this.dataWrapper['currentAccount']['archivedJobs'].length)

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

        // reloading badges
        this.badgeHandler.setPendingNum(this.dataWrapper['currentAccount']['pendingJobs'].length)
        this.badgeHandler.setArchivedNum(this.dataWrapper['currentAccount']['archivedJobs'].length)
        this.badgeHandler.setFavNum(this.dataWrapper['currentAccount']['favoriteJobs'].length)

        // save changes to storage
        this.saveData()
        break;
      }
    }

    return success;
  }

  // logs user out
  logoutUser(): void {
    this.dataWrapper['currentAccount'] = [];

    // messages root account data
    this.badgeHandler.accountPortal(this.dataWrapper['currentAccount']);

    // reloading badges
    this.badgeHandler.setPendingNum(0)
    this.badgeHandler.setArchivedNum(0)
    this.badgeHandler.setFavNum(0)

    // save changes to storage
    this.saveData()
  }
}
