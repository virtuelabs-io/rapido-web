import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatStepperModule, MatFormFieldModule, MatIconModule, MatCheckboxModule, MatCardModule, MatInputModule } from '@angular/material';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, MatToolbarModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatCheckboxModule, MatCardModule, MatInputModule  ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Mobile number should not contain characters', async(() => {
    component.registerFormGroup.controls['mobileNumber'].setValue("asd")
    expect(component.registerFormGroup.controls['mobileNumber'].hasError('pattern')).toBeTruthy()
  }));

  it('Mobile number should contain 10 digits', async(() => {
    component.registerFormGroup.controls['mobileNumber'].setValue("12345")
    expect(component.registerFormGroup.controls['mobileNumber'].hasError('min')).toBeTruthy()
  }));

  it('Mobile number should not start with 0', async(() => {
    component.registerFormGroup.controls['mobileNumber'].setValue("012345")
    expect(component.registerFormGroup.controls['mobileNumber'].hasError('min')).toBeTruthy()
  }));

  it('Mandatory fields during registration', async(() => {
    component.registerFormGroup.controls['mobileNumber'].setValue("12345")
    component.registerFormGroup.controls['name'].setValue("xyz")
    component.registerFormGroup.controls['email'].setValue("xyz@gmail")
    component.registerFormGroup.controls['password'].setValue("12345")
    component.registerFormGroup.controls['confirmPassword'].setValue("12345")
    component.registerFormGroup.controls['termsAndConditions'].setValue("true")
    expect(component.registerFormGroup.controls['mobileNumber'].hasError('required')).toBeFalsy()
    expect(component.registerFormGroup.controls['name'].hasError('required')).toBeFalsy()
    expect(component.registerFormGroup.controls['email'].hasError('required')).toBeFalsy()
    expect(component.registerFormGroup.controls['password'].hasError('required')).toBeFalsy()
    expect(component.registerFormGroup.controls['confirmPassword'].hasError('required')).toBeFalsy()
    expect(component.registerFormGroup.controls['termsAndConditions'].hasError('required')).toBeFalsy()
  }));

  it('Name should contain only characters', async(() => {
    component.registerFormGroup.controls['name'].setValue("abc1")
    expect(component.registerFormGroup.controls['name'].hasError('pattern')).toBeTruthy()
  }));

  it('Name should contain min 3 characters', async(() => {
    component.registerFormGroup.controls['name'].setValue("ab")
    expect(component.registerFormGroup.controls['name'].hasError('minlength')).toBeTruthy()
  }));

  it('Name should not contain more than 20 characters', async(() => {
    component.registerFormGroup.controls['name'].setValue("abcdefg")
    expect(component.registerFormGroup.controls['name'].hasError('minlength')).toBeFalsy()
  }));

  it('Email should match the pattern', async(() => {
    component.registerFormGroup.controls['email'].setValue("abcdefg")
    expect(component.registerFormGroup.controls['email'].hasError('email')).toBeTruthy()
  }));

  it('Password should match the pattern', async(() => {
    component.registerFormGroup.controls['password'].setValue("abcdefg")
    expect(component.registerFormGroup.controls['password'].hasError('pattern')).toBeTruthy()
  }));

  it('Password and confirm password should match', async(() => {
    component.registerFormGroup.controls['password'].setValue("abcdefg")
    component.registerFormGroup.controls['confirmPassword'].setValue("xyz")
    expect(component.registerFormGroup.controls['password'].value !== component.registerFormGroup.controls['confirmPassword'].value).toBeTruthy()
  }));

  it('To register a user', async(() => {
    component.registerFormGroup.controls['mobileNumber'].setValue("1234567890")
    component.registerFormGroup.controls['name'].setValue("xyz")
    component.registerFormGroup.controls['email'].setValue("xyz@gmail.com")
    component.registerFormGroup.controls['password'].setValue("Asdfg@12345")
    component.registerFormGroup.controls['confirmPassword'].setValue("Asdfg@12345")
    component.registerFormGroup.controls['termsAndConditions'].setValue("true")
    expect(component.registerFormGroup.valid).toBeTruthy()
  }));
});
