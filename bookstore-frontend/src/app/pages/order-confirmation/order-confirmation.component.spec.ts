import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationComponent } from './order-confirmation.component';

describe('OrderConfirmation', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
