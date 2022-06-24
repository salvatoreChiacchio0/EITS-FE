import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipModifyComponent } from './membership-modify.component';

describe('MembershipModifyComponent', () => {
  let component: MembershipModifyComponent;
  let fixture: ComponentFixture<MembershipModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
