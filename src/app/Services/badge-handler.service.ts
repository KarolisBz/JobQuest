// this class manages badges values and functions
import { Injectable } from '@angular/core';
//import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BadgeHandlerService {
  // class Vars
  private jobNum: number = 0;
  private pendingNum: number = 0;
  private favNum: number = 0;
  private archivedNum: number = 0;
  private accNotficationNum: number = 0;

  // constructor (fetching needed components)
  constructor() { }

  // fetching appcomponents class reference (to create a bootleg event listener)
  // this is done in Appcompnent constructor which is initialized before any other class
  public appComponent:any;

  // update menu badges
  updateBadges(): void {
    this.appComponent.updateValues(this.jobNum, this.pendingNum, this.favNum, this.archivedNum, this.accNotficationNum);
  }

  // setters
  setJobNum(newVal: number): void {
    this.jobNum = newVal;
    this.updateBadges();
  }

  setPendingNum(newVal: number): void {
    this.pendingNum = newVal;
    this.updateBadges();
  }

  setFavNum(newVal: number): void {
    this.favNum = newVal;
    this.updateBadges();
  }

  setArchivedNum(newVal: number): void {
    this.archivedNum = newVal;
    this.updateBadges();
  }

  setAccNotficationNum(newVal: number): void {
    this.accNotficationNum = newVal;
    this.updateBadges();
  }

  // getters
  getJobNum(): number {
    return this.jobNum;
  }

  getPendingNum(): number {
    return this.pendingNum;
  }

  getFavNum(): number {
    return this.favNum;
  }

  getArchivedNum(): number {
    return this.archivedNum;
  }

  getAccNotficationNum(): number {
    return this.accNotficationNum;
  }

  // used to message bootleg accountcomponent event listner
  accountPortal(accountObj: any): void {
    this.appComponent.login(accountObj);
  }
}
