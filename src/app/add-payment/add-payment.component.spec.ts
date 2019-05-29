import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { AddPaymentComponent } from './add-payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('AddPaymentComponent', () => {
  let component: AddPaymentComponent;
  let fixture: ComponentFixture<AddPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatFormFieldModule, MatCardModule, MatInputModule, BrowserAnimationsModule ],
      declarations: [ AddPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
