import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookingsBoothComponent } from './show-bookings-booth.component';

describe('ShowBookingsBoothComponent', () => {
  let component: ShowBookingsBoothComponent;
  let fixture: ComponentFixture<ShowBookingsBoothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBookingsBoothComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBookingsBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
