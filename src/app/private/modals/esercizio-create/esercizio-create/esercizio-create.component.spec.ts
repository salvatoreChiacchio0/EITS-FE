import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsercizioCreateComponent } from './esercizio-create.component';

describe('EsercizioCreateComponent', () => {
  let component: EsercizioCreateComponent;
  let fixture: ComponentFixture<EsercizioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsercizioCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsercizioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
