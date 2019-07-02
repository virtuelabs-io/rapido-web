import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from './edit-address.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressSpinnerModule, MatFormFieldModule,  MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatProgressSpinnerModule, BrowserAnimationsModule, HttpClientModule, MatCardModule, FormsModule, RouterTestingModule, MatFormFieldModule, MatInputModule ],
      declarations: [ EditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not create', () => {
    expect(component).toBeTruthy();
  });
});