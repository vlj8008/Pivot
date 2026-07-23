import { Service, inject } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { Task } from '../models/task.model';

@Service()
export class StorageService {
  private errorService = inject(ErrorHandlingService);
  private readonly STORAGE_KEY = 'pivot_tasks';

  loadTasks(): Task[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      this.errorService.logError('StorageService', error, { action: 'loadTasks' });
      return [];
    }
  }

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      this.errorService.logError('StorageService', error, { action: 'saveTasks' });
    }
  }
}
