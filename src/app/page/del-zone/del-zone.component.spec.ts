import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelZoneComponent } from './del-zone.component';

describe('DelZoneComponent', () => {
  let component: DelZoneComponent;
  let fixture: ComponentFixture<DelZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
