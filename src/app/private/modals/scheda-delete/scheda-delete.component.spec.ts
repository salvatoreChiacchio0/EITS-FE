import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaDeleteComponent } from './scheda-delete.component';

describe('SchedaDeleteComponent', () => {
  let component: SchedaDeleteComponent;
  let fixture: ComponentFixture<SchedaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
