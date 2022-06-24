import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLabelComponent } from './nav-label.component';

describe('NavLabelComponent', () => {
  let component: NavLabelComponent;
  let fixture: ComponentFixture<NavLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
