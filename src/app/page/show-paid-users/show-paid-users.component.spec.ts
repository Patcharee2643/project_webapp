import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaidUsersComponent } from './show-paid-users.component';

describe('ShowPaidUsersComponent', () => {
  let component: ShowPaidUsersComponent;
  let fixture: ComponentFixture<ShowPaidUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPaidUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPaidUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
