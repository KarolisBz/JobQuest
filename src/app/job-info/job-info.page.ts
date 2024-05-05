import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton, IonButton, IonCard, IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, archive } from 'ionicons/icons';

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

  constructor(private router:Router) {
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

}
