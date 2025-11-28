import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qoutes } from './qoutes';

describe('Qoutes', () => {
  let component: Qoutes;
  let fixture: ComponentFixture<Qoutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qoutes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qoutes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
