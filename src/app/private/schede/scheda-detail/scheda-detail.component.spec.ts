import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaDetailComponent } from './scheda-detail.component';

describe('SchedaDetailComponent', () => {
  let component: SchedaDetailComponent;
  let fixture: ComponentFixture<SchedaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
