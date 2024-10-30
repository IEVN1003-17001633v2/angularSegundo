import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resistencia2Component } from './resistencia2.component';

describe('Resistencia2Component', () => {
  let component: Resistencia2Component;
  let fixture: ComponentFixture<Resistencia2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resistencia2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resistencia2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
