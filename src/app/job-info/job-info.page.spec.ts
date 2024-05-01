import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobInfoPage } from './job-info.page';

describe('JobInfoPage', () => {
  let component: JobInfoPage;
  let fixture: ComponentFixture<JobInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
