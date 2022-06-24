import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsercizioDetailsComponent } from './esercizio-details.component';

describe('EsercizioDetailsComponent', () => {
  let component: EsercizioDetailsComponent;
  let fixture: ComponentFixture<EsercizioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsercizioDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsercizioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
