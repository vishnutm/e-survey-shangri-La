import { Component, Inject, OnInit, Optional } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-questions',
  templateUrl: './add-edit-questions.component.html',
  styleUrls: ['./add-edit-questions.component.css']
})
export class AddEditQuestionsComponent implements OnInit {
public questionId: number;
public modalTitle: string;
public isLoading: boolean;
  constructor(
    public dialogRef: MatDialogRef<AddEditQuestionsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.questionId = data.id;
    this.modalTitle = data.action;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  public close(): void{
    this.dialogRef.close({ event: 'cancel' });
  }

}
