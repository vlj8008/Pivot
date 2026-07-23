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
          { id: '3', title: 'Schedule dentist appointment', category: 'Health', dueDate: '2026-08-15', status: 'New', isActive: true },
          { id: '4', title: 'Buy groceries for the week', category: 'Personal', dueDate: '2026-07-24', status: 'In Progress', isActive: true },
          { id: '5', title: 'Finish Q3 performance review', category: 'Professional Development', dueDate: '2026-09-01', status: 'New', isActive: true },
          { id: '6', title: 'Go for a 5k run', category: 'Health', dueDate: '2026-07-25', status: 'Completed', isActive: true },
          { id: '7', title: 'Review stock portfolio', category: 'Finance', dueDate: '2026-08-10', status: 'New', isActive: true },
          { id: '8', title: 'Call mom for her birthday', category: 'Personal', dueDate: '2026-07-30', status: 'New', isActive: true },
          { id: '9', title: 'Read new architecture book', category: 'Professional Development', dueDate: '2026-08-20', status: 'In Progress', isActive: true },
          { id: '10', title: 'Meal prep for next week', category: 'Health', dueDate: '2026-07-26', status: 'New', isActive: true }
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
