import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton, IonButton, IonCard, IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon, IonAlert } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, archive, copyOutline, heartOutline, archiveOutline } from 'ionicons/icons';
import { DataHandlerService } from '../Services/data-handler.service';
import { JobHandlerService } from '../Services/job-handler.service';
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
  hasArchived:boolean = false;
  hasFavourite:boolean = false;
  favIcon: string = "heart-Outline";
  archiveIcon: string = "archive-Outline";
  applyBtnText: string = "Apply";
  backUrl: string = "/job-posts";
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

  constructor(private dataHandlerService:DataHandlerService, private jobHandler:JobHandlerService) {
    // adding icons
    addIcons({heart, archive, copyOutline, heartOutline, archiveOutline});

    // fetching passed data
    this.activatedRoute.queryParams.subscribe(params => {
      this.jobObj = params;
    });
  }

  ngOnInit(): void {
    // passing pages Id
    this.jobInfo = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  // adds job obj to favourites data
  favouriteJob(): void {
    if (this.hasFavourite) {
      // unfavourite
      this.dataHandlerService.removeFavoriteData(this.jobObj);
      this.toggleFavBtn(false);
    } else {
      // favourite
      this.dataHandlerService.addFavoriteData(this.jobObj);
      this.toggleFavBtn(true);
    }
  }

  // adds job obj to archive-job data
  archiveJob(): void {
    if (this.hasArchived) {
      // unfavourite
      this.dataHandlerService.removeArchivedData(this.jobObj);
      this.toggleArchiveBtn(false);
    } else {
      // favourite
      this.dataHandlerService.addArchivedData(this.jobObj);
      this.toggleArchiveBtn(true);
    }
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
  async ionViewWillEnter(): Promise<void> {
    await this.dataHandlerService.getDataAsync().then((jobData: any) => {
      // unlocking page from last object
      this.applyBtnLock(false);
      this.toggleFavBtn(false);
      this.toggleArchiveBtn(false);

      // setting back btn location
      this.backUrl = this.jobHandler.backUrl;

      // using for loop so we can break out early and save some preformance
      // finding out if job already applied to
      for (let i: number = 0; i < jobData['pendingJobs'].length; i++) {
        let job = jobData['pendingJobs'][i];
        if (job != undefined && job['jobId'] == this.jobObj['jobId']) {
          this.applyBtnLock(true);
          break;
        }
      }

      // if has favourite
      for (let i: number = 0; i < jobData['favoriteJobs'].length; i++) {
        let job = jobData['favoriteJobs'][i];
        if (job != undefined && job['jobId'] == this.jobObj['jobId']) {
          this.toggleFavBtn(true);
          break;
        }
      }

      // if has archived
      for (let i: number = 0; i < jobData['archivedJobs'].length; i++) {
        let job = jobData['archivedJobs'][i];
        if (job != undefined && job['jobId'] == this.jobObj['jobId']) {
          this.toggleArchiveBtn(true);
          break;
        }
      }
    })
  }

  // adds job to pending requests
  applyToJob(alert: any): void {
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
  applyBtnLock(state: boolean): void {
    this.hasApplied = state;
    if (state) {
      this.applyBtnText = "Applied";
    } else {
      this.applyBtnText = "Apply";
    }
  }

  // changes fav button state
  toggleFavBtn(isToggled: boolean): void {
    this.hasFavourite = isToggled;
    if (isToggled) {
      this.favIcon = "heart";
    } else {
      this.favIcon = "heart-Outline";
    }
  }

  // changes archived button state
  toggleArchiveBtn(isToggled: boolean): void {
    this.hasArchived = isToggled;
    if (isToggled) {
      this.archiveIcon = "archive";
    } else {
      this.archiveIcon = "archive-Outline";
    }
  }
}
