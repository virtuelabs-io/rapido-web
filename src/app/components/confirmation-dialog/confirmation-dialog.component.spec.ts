import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  MatDialogModule ],
      declarations: [  ConfirmationDialogComponent ],
     // entryComponents: [ ConfirmationDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
