import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { ResendOtpComponent } from './resend-otp.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ResendOtpComponent', () => {
  let component: ResendOtpComponent;
  let fixture: ComponentFixture<ResendOtpComponent>;
  let loginBtn: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatStepperModule, FormsModule, MatFormFieldModule, MatCardModule, MatInputModule, BrowserAnimationsModule, RouterTestingModule ],
      declarations: [ ResendOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginBtn = fixture.debugElement.query(By.css('.loginButton')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button if mobile number is blank', () => {
    component.mobileNumber = ""
    fixture.detectChanges();
    expect(loginBtn.disabled).toBe(true)
  });
});
