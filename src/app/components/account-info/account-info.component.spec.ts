import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AccountInfoComponent } from './account-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatFormFieldModule, MatCardModule, MatInputModule, MatCheckboxModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { Router, Routes } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;
  let router: Router;
  const routes: Routes = [
    { path: 'login', component: LogInComponent}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatFormFieldModule, MatCardModule, MatIconModule, MatExpansionModule, RouterTestingModule.withRoutes(routes), HttpClientModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule ],
      declarations: [ AccountInfoComponent, LogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(AccountInfoComponent);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
    component.isLoggedIn = true
     expect(component).toBeTruthy();
   });
});
