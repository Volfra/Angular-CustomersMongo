import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Query1Component } from './query1.component';

describe('Query1Component', () => {
  let component: Query1Component;
  let fixture: ComponentFixture<Query1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Query1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Query1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
