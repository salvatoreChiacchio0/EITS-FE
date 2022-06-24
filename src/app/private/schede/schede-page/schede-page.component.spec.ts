import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedePageComponent } from './schede-page.component';

describe('SchedePageComponent', () => {
  let component: SchedePageComponent;
  let fixture: ComponentFixture<SchedePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
