import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.css']
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Input() isHighlighted = false;
  
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }
}
