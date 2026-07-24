import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  dialogRef = inject(MatDialogRef<TaskModalComponent>);
  private fb = inject(FormBuilder);
  public data = inject<Task | null>(MAT_DIALOG_DATA, { optional: true });
  public isEditMode = !!this.data;

  taskForm = this.fb.group({
    title: [this.data?.title || '', [Validators.required]],
    dueDate: [this.data?.dueDate ? new Date(this.data.dueDate) : null, [Validators.required]],
    category: [this.data?.category || '', [Validators.required]],
    description: [this.data?.description || ''],
    status: [this.data?.status || 'New', [Validators.required]]
  });

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskPayload = {
        title: formValue.title,
        dueDate: formValue.dueDate ? (formValue.dueDate as Date).toISOString().split('T')[0] : '',
        category: formValue.category,
        description: formValue.description,
        status: formValue.status
      };
      this.dialogRef.close(taskPayload);
    }
  }
}
