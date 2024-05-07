import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton, IonButton, IonCard, IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, archive } from 'ionicons/icons';
import { DataHandlerService } from '../Services/data-handler.service';
import { BadgeHandlerService } from '../Services/badge-handler.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.page.html',
  styleUrls: ['./job-info.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonCard, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, RouterLinkWithHref]
})
export class JobInfoPage implements OnInit {
  // class vars
  public jobInfo!: string;
  jobObj:any;
  private activatedRoute = inject(ActivatedRoute);

  constructor(private dataHandlerService:DataHandlerService, private badgeHandler:BadgeHandlerService) {
    // adding icons
    addIcons({heart, archive});

    // fetching passed data
    this.activatedRoute.queryParams.subscribe(params => {
      this.jobObj = params;

      // decoding string for normal html output
      const parser = new DOMParser();
      const parsedText = parser.parseFromString(this.jobObj['jobDescription'] , 'text/html').body.textContent;
      console.log(parsedText)
    });
  }

  ngOnInit() {
    this.jobInfo = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log(this.jobObj);
  }

  // adds job obj to favourites data
  favouriteJob() {

  }

  // adds job obj to archive-job data
  archiveJob() {

  }

  // adds job to pending requests
  applyToJob() {
    this.dataHandlerService.addPendingData(this.jobObj);
    // temp increase badge value by 1 until page is loaded and resorted
    this.badgeHandler.setPendingNum(this.badgeHandler.getPendingNum() + 1)
  }
}
