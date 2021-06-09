import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogBackofficeDataModel } from '../../models/deleteDialogBackofficeDataModel';

@Component({
  selector: 'app-delete-dialog-backoffice',
  templateUrl: './delete-dialog-backoffice.component.html',
  styleUrls: ['./delete-dialog-backoffice.component.css']
})
export class DeleteDialogBackofficeComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteDialogBackofficeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogBackofficeDataModel) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}
