import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.page.html',
  styleUrls: ['./job-info.page.scss'],
  standalone: true,
  imports: [IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, RouterLinkWithHref]
})
export class JobInfoPage implements OnInit {
  // class vars
  public jobInfo!: string;
  jobObj:any;
  private activatedRoute = inject(ActivatedRoute);

  constructor(private router:Router) {
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
