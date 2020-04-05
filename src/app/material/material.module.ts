import { NgModule } from '@angular/core';
import { MatProgressBarModule, MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, 
  MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, 
  MatSnackBarModule, MatExpansionModule, MatSelectModule, MatPaginatorModule, 
  MatProgressSpinnerModule, MatDialogModule, MatCardModule,
  MatFormFieldModule, MatTableModule, MatTreeModule  } from '@angular/material';

const MaterialComponents = [MatProgressBarModule, MatStepperModule, MatInputModule, MatCheckboxModule, MatButtonModule, 
  MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatListModule, 
  MatSnackBarModule, MatExpansionModule, MatSelectModule, MatPaginatorModule, 
  MatProgressSpinnerModule, MatDialogModule, MatCardModule,
  MatFormFieldModule, MatTableModule, MatTreeModule];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
  
})
export class MaterialModule { }
