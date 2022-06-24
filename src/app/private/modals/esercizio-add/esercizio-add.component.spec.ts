import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsercizioAddComponent } from './esercizio-add.component';

describe('EsercizioAddComponent', () => {
  let component: EsercizioAddComponent;
  let fixture: ComponentFixture<EsercizioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsercizioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsercizioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
