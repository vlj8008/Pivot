import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  
  tasks = this.taskService.getTasks();
  searchQuery = signal('');

  filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const allTasks = this.tasks();
    
    if (!query) {
      return allTasks;
    }
    
    return allTasks.filter(task => task.title.toLowerCase().includes(query));
  });

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
