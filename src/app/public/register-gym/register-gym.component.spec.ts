import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGymComponent } from './register-gym.component';

describe('RegisterGymComponent', () => {
  let component: RegisterGymComponent;
  let fixture: ComponentFixture<RegisterGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGymComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
