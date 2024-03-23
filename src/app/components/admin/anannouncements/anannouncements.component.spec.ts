import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnannouncementsComponent } from './anannouncements.component';

describe('AnannouncementsComponent', () => {
  let component: AnannouncementsComponent;
  let fixture: ComponentFixture<AnannouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnannouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnannouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
