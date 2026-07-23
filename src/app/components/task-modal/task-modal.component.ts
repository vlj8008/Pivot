import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  dialogRef = inject(MatDialogRef<TaskModalComponent>);
  public data = inject<Task | null>(MAT_DIALOG_DATA, { optional: true });
  public isEditMode = !!this.data;

  close(): void {
    this.dialogRef.close();
  }
}
