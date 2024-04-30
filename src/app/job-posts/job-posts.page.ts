import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.page.html',
  styleUrls: ['./job-posts.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class JobPostsPage implements OnInit {

  public jobPosts!: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.jobPosts = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
