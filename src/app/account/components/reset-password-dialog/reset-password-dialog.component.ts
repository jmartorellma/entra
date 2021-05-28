import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {

  public email: string;

  constructor(
    public resetDialog: MatDialogRef<ResetPasswordDialogComponent>) {
      this.email = '';
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.resetDialog.close();
  }

  onOkClick(email: string) {
    this.email = email;
    this.resetDialog.close(this.email);
  }
}

export interface ResetDialogData {
  email: string;
}