import { Service, inject, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { StorageService } from './storage.service';
import { ErrorHandlingService } from './error-handling.service';

@Service()
export class TaskService {
  private storageService = inject(StorageService);
  private errorService = inject(ErrorHandlingService);

  private tasksSignal = signal<Task[]>([]);

  constructor() {
    this.loadInitialTasks();
  }

  private loadInitialTasks(): void {
    try {
      const tasks = this.storageService.loadTasks();
      this.tasksSignal.set(tasks);
    } catch (error) {
      this.errorService.logError('TaskService', error, { action: 'loadInitialTasks' });
    }
  }

  getTasks() {
    return this.tasksSignal;
  }

  addTask(task: Task): void {
    try {
      this.tasksSignal.update(tasks => {
        const updated = [...tasks, task];
        this.storageService.saveTasks(updated);
        return updated;
      });
    } catch (error) {
      this.errorService.logError('TaskService', error, { action: 'addTask' });
    }
  }

  updateTask(updatedTask: Task): void {
    try {
      this.tasksSignal.update(tasks => {
        const updated = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
        this.storageService.saveTasks(updated);
        return updated;
      });
    } catch (error) {
      this.errorService.logError('TaskService', error, { action: 'updateTask' });
    }
  }

  deleteTask(id: string): void {
    try {
      this.tasksSignal.update(tasks => {
        const updated = tasks.map(t => t.id === id ? { ...t, isActive: false } : t);
        this.storageService.saveTasks(updated);
        return updated;
      });
    } catch (error) {
      this.errorService.logError('TaskService', error, { action: 'deleteTask' });
    }
  }
}
