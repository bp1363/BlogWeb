import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCorner } from './my-corner';

describe('MyCorner', () => {
  let component: MyCorner;
  let fixture: ComponentFixture<MyCorner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCorner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCorner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
