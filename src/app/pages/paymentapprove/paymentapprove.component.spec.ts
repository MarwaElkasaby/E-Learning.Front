import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentapproveComponent } from './paymentapprove.component';

describe('PaymentapproveComponent', () => {
  let component: PaymentapproveComponent;
  let fixture: ComponentFixture<PaymentapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentapproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
