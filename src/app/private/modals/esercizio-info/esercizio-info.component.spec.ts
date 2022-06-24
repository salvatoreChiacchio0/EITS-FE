import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsercizioInfoComponent } from './esercizio-info.component';

describe('EsercizioInfoComponent', () => {
  let component: EsercizioInfoComponent;
  let fixture: ComponentFixture<EsercizioInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsercizioInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsercizioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
