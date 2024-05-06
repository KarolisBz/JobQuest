// this class handles the data storage of the program
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService implements OnInit{
  // service fields
  dataWrapper:any;

  // constructor
  constructor(private storage:Storage) {};

  // creates datastore on initzliation of service
  async ngOnInit() {
    await this.storage.create();
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
    this.dataWrapper = await this.storage.get('wrappedData');
  }

  // returns data wrapped to caller function
  getData(holder:any): any {
    console.log(holder);
    return this.dataWrapper;
  }

  // adds pending job data to be saved
  addPendingData(pendingJobs: any): void {
    this.dataWrapper['pendingJobs'].push(pendingJobs);
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
