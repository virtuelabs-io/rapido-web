import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipCaseComponent } from './flip-case.component';

describe('FlipCaseComponent', () => {
  let component: FlipCaseComponent;
  let fixture: ComponentFixture<FlipCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
