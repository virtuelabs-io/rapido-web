import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusyLoaderComponent } from './busy-loader.component';

describe('BusyLoaderComponent', () => {
  let component: BusyLoaderComponent;
  let fixture: ComponentFixture<BusyLoaderComponent>;
  let ele: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show busy indicator', () => {
    component.loading = true// replace this with mock service
    expect(component.loading).toBeTruthy();
  });
});
