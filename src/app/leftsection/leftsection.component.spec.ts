import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSectionComponent } from './leftsection.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LeftSectionComponent', () => {
  let component: LeftSectionComponent;
  let fixture: ComponentFixture<LeftSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSectionComponent ],
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
