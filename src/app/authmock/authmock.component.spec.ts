import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthmockComponent } from './authmock.component';

describe('AuthmockComponent', () => {
  let component: AuthmockComponent;
  let fixture: ComponentFixture<AuthmockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthmockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthmockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
