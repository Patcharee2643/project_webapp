import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUnpaidUsersComponent } from './show-unpaid-users.component';

describe('ShowUnpaidUsersComponent', () => {
  let component: ShowUnpaidUsersComponent;
  let fixture: ComponentFixture<ShowUnpaidUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUnpaidUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUnpaidUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
