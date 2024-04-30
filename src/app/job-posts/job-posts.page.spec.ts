import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobPostsPage } from './job-posts.page';

describe('JobPostsPage', () => {
  let component: JobPostsPage;
  let fixture: ComponentFixture<JobPostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
