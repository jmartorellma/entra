import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {

  constructor(
    public resetDialog: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResetDialogData) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.resetDialog.close();
  }

  onClose(): void {
    this.resetDialog.close();
  }

}

export interface ResetDialogData {
  email: string;
}