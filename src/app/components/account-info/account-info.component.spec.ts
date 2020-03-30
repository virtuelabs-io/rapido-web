import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AccountInfoComponent } from './account-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatExpansionModule
} from '@angular/material';
import { Router, Routes } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;
  let router: Router;
  const routes: Routes = [{ path: 'login', component: LogInComponent }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        MatCheckboxModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AccountInfoComponent,
        LogInComponent,
        ConfirmationDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [ConfirmationDialogComponent] }
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
    component.isLoggedIn = true;
    expect(component).toBeTruthy();
  });
});
