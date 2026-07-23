import '@angular/compiler';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Injector, runInInjectionContext, signal } from '@angular/core';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let mockTaskService: any;
  let mockTasksSignal: ReturnType<typeof signal>;

  beforeEach(() => {
    mockTasksSignal = signal<Task[]>([
      { id: '1', title: 'Buy Groceries', category: 'Personal', dueDate: '2026-12-31', status: 'New', isActive: true, description: '' },
      { id: '2', title: 'Finish Report', category: 'Professional Development', dueDate: '2026-12-31', status: 'In Progress', isActive: true, description: '' }
    ]);

    mockTaskService = {
      getTasks: vi.fn().mockReturnValue(mockTasksSignal)
    };

    const injector = Injector.create({
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    });

    runInInjectionContext(injector, () => {
      component = new TaskListComponent();
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks from TaskService on init', () => {
    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.tasks().length).toBe(2);
  });

  it('should filter tasks by title case-insensitively', () => {
    expect(component.filteredTasks().length).toBe(2);

    component.searchQuery.set('groceries');
    expect(component.filteredTasks().length).toBe(1);
    expect(component.filteredTasks()[0].title).toBe('Buy Groceries');

    component.searchQuery.set('REPORT');
    expect(component.filteredTasks().length).toBe(1);
    expect(component.filteredTasks()[0].title).toBe('Finish Report');

    component.searchQuery.set('Nonexistent');
    expect(component.filteredTasks().length).toBe(0);
  });
});
