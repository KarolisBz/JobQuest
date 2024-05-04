// this class manages badges values and functions
import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

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

  // fetching appcomponents class reference (to create a bootleg event listener)
  public appComponent:AppComponent = new AppComponent(this);

  // constructor
  constructor() { }

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
}
