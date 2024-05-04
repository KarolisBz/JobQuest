import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, personCircleOutline, personSharp, personOutline  } from 'ionicons/icons';
import { BadgeHandlerService } from './Services/badge-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonBadge, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Job Posts', url: '/job-posts', icon: 'mail' },
    { title: 'Pending Requests', url: '/folder/Pending Requests', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Account', url: '/folder/Account', icon: 'person'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private badgeHandlerService:BadgeHandlerService) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, personCircleOutline, personSharp, personOutline  });

    // runs first, setup for BadgeHandlerService refernce
    this.badgeHandlerService.appComponent = this;
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
    console.log(jobNum)
    // setting values that are databinded
    this.badgeDictionary["Job Posts"] = jobNum;
    this.badgeDictionary["Pending Requests"] = pendingNum;
    this.badgeDictionary.Favorites = favNum;
    this.badgeDictionary.Archived = archivedNum;
    this.badgeDictionary.Account = accNotficationNum;
  }
}
