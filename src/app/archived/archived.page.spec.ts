import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivedPage } from './archived.page';

describe('ArchivedPage', () => {
  let component: ArchivedPage;
  let fixture: ComponentFixture<ArchivedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
