import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardFlipComponent } from './home-card-flip.component';

describe('HomeCardFlipComponent', () => {
  let component: HomeCardFlipComponent;
  let fixture: ComponentFixture<HomeCardFlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCardFlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
