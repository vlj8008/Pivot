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
      if (tasks.length === 0) {
        const dummyTasks: Task[] = [
          { id: '1', title: 'Complete Angular tutorial', category: 'Professional Development', dueDate: '2026-08-01', status: 'In Progress', isActive: true },
          { id: '2', title: 'Pay electricity bill', category: 'Finance', dueDate: '2026-07-28', status: 'New', isActive: true },
          { id: '3', title: 'Schedule dentist appointment', category: 'Health', dueDate: '2026-08-15', status: 'New', isActive: true }
        ];
        this.tasksSignal.set(dummyTasks);
        this.storageService.saveTasks(dummyTasks);
      } else {
        this.tasksSignal.set(tasks);
      }
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
