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
import { TaskItemComponent } from '../task-item/task-item';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule, MatButtonModule, MatSortModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule, TaskItemComponent, MatSelectModule],
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
  isToastOpen = signal(false);

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
    if (typeof a === 'string' && typeof b === 'string') {
      const cmp = a.trim().localeCompare(b.trim(), undefined, { numeric: true, sensitivity: 'base' });
      return cmp * (isAsc ? 1 : -1);
    }
    if (a === b) return 0;
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

  clearSearch(): void {
    this.searchQuery.set('');
    this.pageIndex.set(0);
  }

  sortData(sort: Sort): void {
    this.sortState.set(sort);
    this.pageIndex.set(0);
  }

  onMobileSort(value: string): void {
    const [active, direction] = value.split('-');
    this.sortData({ active, direction: direction as 'asc' | 'desc' });
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
        
        // Clear search filter so the new task is always visible
        this.searchQuery.set('');
        
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

        this.isToastOpen.set(true);
        const snackBarRef = this.snackBar.open('Task created successfully.', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.isToastOpen.set(false);
        });
      }
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '600px',
      disableClose: true,
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedTask: Task = {
          ...task,
          title: result.title,
          category: result.category,
          dueDate: result.dueDate,
          description: result.description,
          status: result.status
        };
        this.taskService.updateTask(updatedTask);
        this.searchQuery.set(''); // Clear search box after editing
        
        // Find where the edited task landed in the sorted/filtered list
        const sortedList = this.filteredTasks();
        const taskIndex = sortedList.findIndex(t => t.id === updatedTask.id);
        
        if (taskIndex !== -1) {
          const targetPage = Math.floor(taskIndex / this.pageSize());
          this.pageIndex.set(targetPage);
          this.highlightedTaskId.set(updatedTask.id);
          
          // Clear highlight after 3 seconds
          setTimeout(() => {
            if (this.highlightedTaskId() === updatedTask.id) {
              this.highlightedTaskId.set(null);
            }
          }, 3000);
        }

        this.isToastOpen.set(true);
        const snackBarRef = this.snackBar.open('Task updated successfully.', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.isToastOpen.set(false);
        });
      }
    });
  }

  deleteTask(id: string): void {
    this.highlightedTaskId.set(id);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      position: { top: '4rem' },
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to permanently delete this task? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.highlightedTaskId.set(null);
      
      if (result) {
        this.taskService.deleteTask(id);
        this.searchQuery.set(''); // Clear search box after deleting
        this.isToastOpen.set(true);
        const snackBarRef = this.snackBar.open('Task deleted successfully.', 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.isToastOpen.set(false);
        });
      }
    });
  }
}
