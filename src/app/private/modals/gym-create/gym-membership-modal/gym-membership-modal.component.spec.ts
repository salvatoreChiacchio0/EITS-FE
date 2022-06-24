import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymMembershipModalComponent } from './gym-membership-modal.component';

describe('GymMembershipModalComponent', () => {
  let component: GymMembershipModalComponent;
  let fixture: ComponentFixture<GymMembershipModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymMembershipModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymMembershipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
