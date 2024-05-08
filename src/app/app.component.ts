import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonBadge, IonChip, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, personCircleOutline, personSharp, personOutline, menu  } from 'ionicons/icons';
import { BadgeHandlerService } from './Services/badge-handler.service';
import { DataHandlerService } from './Services/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonChip, IonBadge, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppComponent implements OnDestroy {
  public appPages = [
    { title: 'Job Posts', url: '/job-posts', icon: 'mail' },
    { title: 'Pending Requests', url: '/pending-requests', icon: 'paper-plane' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'Archived', url: '/archived', icon: 'archive' },
    { title: 'Account', url: '/account', icon: 'person'},
  ];
  public labels = ['In-person', 'Remote', 'Student', 'Part Time', 'Full Time'];

  constructor(private badgeHandlerService:BadgeHandlerService, private router:Router, private dataHandler:DataHandlerService) {
    // adding ion-icons
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, personCircleOutline, personSharp, personOutline  });

    // runs first, setup for BadgeHandlerService referance
    this.badgeHandlerService.appComponent = this;
  }

  // saves database on application exit
  ngOnDestroy(): void {
    this.dataHandler.saveData();
  }

  // logged in
  isLoggedIn:boolean = true;

  // we use this function to hide the menu on route
  // fetching instance, credit to https://forum.ionicframework.com/t/how-do-i-get-html-element-values/94925/5 for post
  // getting this to work took way too long...
  @ViewChild('menuTag') menu!: IonMenu;

  toAccountPage():void {
    // routing to specified page
    this.router.navigate(['folder/Account']);
    
    // closing side menu
    this.menu.close();
  }

  // badge numbers (with their respective page titles)
  badgeDictionary: any = {
    'Job Posts': null,
    'Pending Requests': null,
    'Favorites': null,
    'Archived': null,
    'Account': null
  };

  // creating a bootleg event listener to ensure values stay UpToDate
  // we keep attributes as type any so it can be changed to null
  updateValues(jobNum:any, pendingNum:any, favNum:any, archivedNum:any, accNotficationNum:any)
  {
    // setting nulls to not show '0' on badge
    if (jobNum <= 0) jobNum = null;
    if (pendingNum <= 0) pendingNum = null;
    if (favNum <= 0) favNum = null;
    if (archivedNum <= 0) archivedNum = null;
    if (accNotficationNum <= 0) accNotficationNum = null;

    // setting values that are databinded
    this.badgeDictionary["Job Posts"] = jobNum;
    this.badgeDictionary["Pending Requests"] = pendingNum;
    this.badgeDictionary['Favorites'] = favNum;
    this.badgeDictionary['Archived'] = archivedNum;
    this.badgeDictionary['Account'] = accNotficationNum;
  }
}
