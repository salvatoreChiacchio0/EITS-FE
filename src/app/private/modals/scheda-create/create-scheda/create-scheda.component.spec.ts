import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchedaComponent } from './create-scheda.component';

describe('CreateSchedaComponent', () => {
  let component: CreateSchedaComponent;
  let fixture: ComponentFixture<CreateSchedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSchedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
