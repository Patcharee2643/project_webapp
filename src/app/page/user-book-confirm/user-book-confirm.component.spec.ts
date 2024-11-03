import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookConfirmComponent } from './user-book-confirm.component';

describe('UserBookConfirmComponent', () => {
  let component: UserBookConfirmComponent;
  let fixture: ComponentFixture<UserBookConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBookConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
