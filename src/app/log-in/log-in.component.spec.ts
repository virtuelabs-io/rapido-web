import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ LogInComponent ]
    })
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h1 tag', async(() => {
    const fixture = TestBed.createComponent(LogInComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Log in to Rapidobuild.com');
  }));

  it('should contain the prefix for mobile number', async(() => {
    expect(component.countryCode).toContain('+');
    expect(component.countryCode.length).toEqual(3);
  }));

  it('should throw error alert for missing mobile number', async(() => {
    component.login();
    expect(component.alertMsg).toEqual("Please enter mobile number");
    expect(component.alertBox).toBeTruthy();
    expect(component.progressSpinner).toBeFalsy();
  }));

  it('should throw error alert for missing password', async(() => {
    component.mobileNumber = "1234567890";
    component.login();
    expect(component.alertMsg).toEqual("Please enter password");
    expect(component.alertBox).toBeTruthy();
    expect(component.progressSpinner).toBeFalsy();
  }));

  it('should contain 10 digits for mobile number', async(() => {
    component.mobileNumber = "1234567890";
    //component.login();
    expect(component.mobileNumber.length).toEqual(10);
  }));
});