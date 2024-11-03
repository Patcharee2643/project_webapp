import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPendingBoothComponent } from './show-pending-booth.component';

describe('ShowPendingBoothComponent', () => {
  let component: ShowPendingBoothComponent;
  let fixture: ComponentFixture<ShowPendingBoothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPendingBoothComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPendingBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
