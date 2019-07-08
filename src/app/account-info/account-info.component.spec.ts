import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AccountInfoComponent } from './account-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatFormFieldModule, MatCardModule, MatInputModule, MatCheckboxModule, MatIconModule, MatExpansionModule } from '@angular/material';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatFormFieldModule, MatCardModule, MatIconModule, MatExpansionModule, RouterTestingModule, HttpClientModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule ],
      declarations: [ AccountInfoComponent ]
    })
    .compileComponents();
    const someServiceStub = jasmine.createSpyObj('ProfileService', ['cognitoUser.getUserAttributes']);
    someServiceStub.cognitoUser.getUserAttributes.and.returnValue(
      [
        {"CognitoUserAttribute": {Name: "sub", Value: "b91c285c-2b92-4401-9d1e-c883deb95a6b"}},
        {"CognitoUserAttribute": {Name: "email_verified", Value: "false"}},
        {"CognitoUserAttribute": {Name: "custom:acceptedTAndC", Value: "true"}},
        {"CognitoUserAttribute": {Name: "custom:personalisation", Value: "false"}},
        {"CognitoUserAttribute": {Name: "phone_number_verified", Value: "true"}},
        {"CognitoUserAttribute": {Name: "custom:rapidoId", Value: "12e7c3cd-8606-43ec-a103-7b73709a42f1"}},
        {"CognitoUserAttribute": {Name: "custom:commViaEmail", Value: "false"}},
        {"CognitoUserAttribute": {Name: "name", Value: "Anirup Pat"}},
        {"CognitoUserAttribute": {Name: "phone_number", Value: "+917032908112"}},
        {"CognitoUserAttribute": {Name: "custom:sendMePromotions", Value: "false"}},
        {"CognitoUserAttribute": {Name: "email", Value: "anirup049@gmail.com"}},
        {"CognitoUserAttribute": {Name: "custom:commViaSMS", Value: "false"}}
      ]
    );
  }));

  beforeEach(() => {
    

    fixture = TestBed.createComponent(AccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    
  });

  it('should create', () => {
    component.fetchUserProfile();
    expect(component).toBeTruthy();
  });
});
