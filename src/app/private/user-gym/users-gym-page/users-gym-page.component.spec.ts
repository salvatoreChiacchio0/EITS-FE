import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGymPageComponent } from './users-gym-page.component';

describe('UsersGymPageComponent', () => {
  let component: UsersGymPageComponent;
  let fixture: ComponentFixture<UsersGymPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersGymPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersGymPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
