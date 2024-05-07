import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton, IonButton, IonCard, IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon, IonAlert } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, archive, copyOutline, text } from 'ionicons/icons';
import { DataHandlerService } from '../Services/data-handler.service';
import { Browser } from '@capacitor/browser'; // a plugin utilizing capacitor 
import { Clipboard } from '@capacitor/clipboard'; // a plugin utilizing capacitor
import { Toast } from '@capacitor/toast';  // a plugin utilizing capacitor

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.page.html',
  styleUrls: ['./job-info.page.scss'],
  standalone: true,
  imports: [IonAlert, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel, IonCard, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, RouterLinkWithHref]
})
export class JobInfoPage implements OnInit {
  // class vars
  public jobInfo!: string;
  jobObj: any;
  hasApplied: boolean = false;
  applyBtnText: string = "Apply";
  private activatedRoute = inject(ActivatedRoute);
  alertButtons = [
    {
      text: 'Apply',
      role: 'apply'
    },
    {
      text: 'Cancel',
      role: 'cancel'
    },
  ];

  constructor(private dataHandlerService:DataHandlerService) {
    // adding icons
    addIcons({heart, archive, copyOutline});

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
  }

  // adds job obj to favourites data
  favouriteJob() {

  }

  // adds job obj to archive-job data
  archiveJob() {

  }

  // opens site in app allowing for event listening
  async openCapacitorSite() {
    await Browser.open({ url: this.jobObj['jobUrl'] });
  };

  // copys data into internal phone memory at clipboard
  async writeToClipboard (dataString: string) {
    await Clipboard.write({
      string: dataString
    });

    // only works on mobile version
    this.promptToast(dataString + " copied!");
  };

  // displays message from phone UI
  async promptToast(output: string) {
    await Toast.show({
      text: output,
    });
  };

  // code runs when page is accessed, stopping people from re-applying
  ionViewWillEnter() {
    let jobData:any = this.dataHandlerService.getData()['pendingJobs'];
    
    // unlocking page from last object
    this.applyBtnLock(false);

    // using for loop so we can break out early and save some preformance
    // finding out if job already applied to
    for (let i: number = 0; i < jobData.length; i++) {
      let job = jobData[i];
      if (job != undefined && job['jobId'] == this.jobObj['jobId']) {
        this.applyBtnLock(true);
        break;
      }
    }
  }

  // adds job to pending requests
  applyToJob(alert: any) {
    if (alert.detail.role == 'apply') {
      let alreadyApplied: boolean = this.dataHandlerService.addPendingData(this.jobObj);
      this.applyBtnLock(true);

      if (alreadyApplied) {
        // code ran if user somehow applied again
        this.promptToast("You have already applied");
        this.applyBtnLock(true);
      }
    }
  }

  // locks the apply button when already applied
  applyBtnLock(state: boolean) {
    if (state) {
      this.hasApplied = true;
      this.applyBtnText = "Applied";
    } else {
      this.hasApplied = false;
      this.applyBtnText = "Apply";
    }
  }
}
