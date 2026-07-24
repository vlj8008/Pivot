import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule, MatButtonModule, MatSortModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  tasks = this.taskService.getTasks();
  searchQuery = signal('');
  sortState = signal<Sort>({ active: 'title', direction: 'asc' });
  pageSize = signal(5);
  pageIndex = signal(0);
  highlightedTaskId = signal<string | null>(null);

  displayedColumns: string[] = ['title', 'category', 'description', 'dueDate', 'status', 'actions'];

  filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    let allTasks = this.tasks().filter(task => task.isActive);
    
    if (query) {
      allTasks = allTasks.filter(task => task.title.toLowerCase().includes(query));
    }
    
    const sort = this.sortState();
    if (!sort.active || sort.direction === '') {
      return allTasks;
    }

    const isAsc = sort.direction === 'asc';
    return [...allTasks].sort((a, b) => {
      switch (sort.active) {
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'category': return this.compare(a.category, b.category, isAsc);
        case 'dueDate': return this.compare(a.dueDate, b.dueDate, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  });

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  paginatedTasks = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.filteredTasks().slice(startIndex, startIndex + this.pageSize());
  });

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.pageIndex.set(0);
  }

  sortData(sort: Sort): void {
    this.sortState.set(sort);
    this.pageIndex.set(0);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }

  openTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTask: Task = {
          id: Date.now().toString(),
          title: result.title,
          category: result.category,
          dueDate: result.dueDate,
          description: result.description,
          status: result.status,
          isActive: true
        };
        this.taskService.addTask(newTask);
        
        // Find where the new task landed in the sorted/filtered list
        const sortedList = this.filteredTasks();
        const taskIndex = sortedList.findIndex(t => t.id === newTask.id);
        
        if (taskIndex !== -1) {
          const targetPage = Math.floor(taskIndex / this.pageSize());
          this.pageIndex.set(targetPage);
          this.highlightedTaskId.set(newTask.id);
          
          // Clear highlight after 3 seconds
          setTimeout(() => {
            if (this.highlightedTaskId() === newTask.id) {
              this.highlightedTaskId.set(null);
            }
          }, 3000);
        }
      }
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.snackBar.open('Task deleted successfully.', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
