import { Component, OnInit, Inject, NgModule } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@NgModule({
  declarations: [],
  exports: [],
  entryComponents: [],
})
@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
