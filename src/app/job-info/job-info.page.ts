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
  private activatedRoute = inject(ActivatedRoute);
  constructor(private router:Router) {}

  ngOnInit() {
    this.jobInfo = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
