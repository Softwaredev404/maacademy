import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenthistorytableComponent } from './paymenthistorytable.component';

describe('PaymenthistorytableComponent', () => {
  let component: PaymenthistorytableComponent;
  let fixture: ComponentFixture<PaymenthistorytableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymenthistorytableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymenthistorytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
