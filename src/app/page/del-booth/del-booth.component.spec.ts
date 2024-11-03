import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelBoothComponent } from './del-booth.component';

describe('DelBoothComponent', () => {
  let component: DelBoothComponent;
  let fixture: ComponentFixture<DelBoothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelBoothComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
