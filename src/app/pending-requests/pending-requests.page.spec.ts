import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingRequestsPage } from './pending-requests.page';

describe('PendingRequestsPage', () => {
  let component: PendingRequestsPage;
  let fixture: ComponentFixture<PendingRequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
